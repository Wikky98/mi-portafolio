#!/usr/bin/env python3
"""
SCRIPT AUTOMÁTICO PARA ACTUALIZAR PORTAFOLIO DESPLEGADO
Uso: python update-portfolio.py
"""

import os
import sys
import subprocess
import re
from datetime import datetime
import webbrowser

# Colores ANSI para terminal
class Colors:
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    PURPLE = '\033[0;35m'
    CYAN = '\033[0;36m'
    BOLD = '\033[1m'
    END = '\033[0m'

def log_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.END}")

def log_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.END}")

def log_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.END}")

def log_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.END}")

def log_question(message):
    print(f"{Colors.PURPLE}❓ {message}{Colors.END}")

def run_command(command, capture_output=True):
    """Ejecutar comando y retornar resultado"""
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            capture_output=capture_output, 
            text=True,
            check=True
        )
        return result.stdout.strip() if capture_output else True
    except subprocess.CalledProcessError as e:
        if capture_output:
            return None
        return False

def check_git_status():
    """Verificar si hay cambios sin commit"""
    result = run_command("git diff-index --quiet HEAD --")
    return result is not None

def get_repo_info():
    """Obtener información del repositorio"""
    try:
        repo_url = run_command("git remote get-url origin")
        if not repo_url:
            return None, None
        
        # Extraer username y repo name
        if 'github.com' in repo_url:
            # SSH: git@github.com:user/repo.git o HTTPS: https://github.com/user/repo.git
            match = re.search(r'github\.com[:/]([^/]+)/([^/]+?)(?:\.git)?$', repo_url)
            if match:
                username, repo_name = match.groups()
                return username, repo_name
        
        return None, None
    except:
        return None, None

def generate_commit_message():
    """Generar mensaje de commit inteligente"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    base_msg = f"🔄 Auto-update portfolio - {timestamp}"
    
    # Detectar tipo de cambios
    try:
        changed_files = run_command("git diff --cached --name-only")
        if changed_files:
            if 'js/config.js' in changed_files:
                config_diff = run_command("git diff --cached js/config.js")
                if config_diff and any(keyword in config_diff for keyword in ['"title":', '"description":', '"technologies":']):
                    return f"📂 Add/update projects - {timestamp}"
                elif config_diff and any(keyword in config_diff for keyword in ['"name":', '"email":', '"bio":']):
                    return f"👤 Update personal info - {timestamp}"
            
            if any('assets/images/' in f for f in changed_files.split('\n')):
                return f"🖼️  Update images - {timestamp}"
    except:
        pass
    
    return base_msg

def main():
    print("\n" + "="*55)
    print("   🚀 ACTUALIZADOR AUTOMÁTICO DE PORTAFOLIO")
    print("="*55 + "\n")
    
    # Verificar directorio correcto
    if not os.path.exists('js/config.js'):
        log_error("No se encontró js/config.js")
        log_info("Asegúrate de estar en la carpeta del portafolio.")
        return 1
    
    # Verificar git
    if not os.path.exists('.git'):
        log_error("No se encontró repositorio git")
        log_info("Inicializa git primero: git init")
        return 1
    
    # Verificar si git está instalado
    if not run_command("git --version"):
        log_error("Git no está instalado o no está en el PATH")
        return 1
    
    log_info("Verificando estado del repositorio...")
    
    # Verificar cambios
    if not check_git_status():
        log_warning("Hay cambios sin hacer commit")
        print()
        log_question("¿Qué quieres hacer?")
        print("1) Auto-commit todos los cambios")
        print("2) Ver los cambios primero")
        print("3) Cancelar")
        
        choice = input("\nSelecciona una opción (1-3): ").strip()
        
        if choice == '1':
            log_info("Haciendo commit automático de todos los cambios...")
            run_command("git add .", capture_output=False)
            
            commit_msg = generate_commit_message()
            if run_command(f'git commit -m "{commit_msg}"', capture_output=False):
                log_success(f"Commit creado: {commit_msg}")
            else:
                log_error("Error al crear commit")
                return 1
                
        elif choice == '2':
            print("\n" + log_info("Cambios detectados:"))
            run_command("git status --porcelain", capture_output=False)
            print()
            run_command("git diff --stat", capture_output=False)
            
            confirm = input("\n¿Continuar con el commit? (y/N): ").strip().lower()
            if confirm == 'y':
                run_command("git add .", capture_output=False)
                timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                commit_msg = f"🔄 Manual update portfolio - {timestamp}"
                if run_command(f'git commit -m "{commit_msg}"', capture_output=False):
                    log_success("Commit creado")
                else:
                    log_error("Error al crear commit")
                    return 1
            else:
                log_warning("Operación cancelada por el usuario")
                return 0
                
        elif choice == '3':
            log_warning("Operación cancelada por el usuario")
            return 0
        else:
            log_error("Opción inválida")
            return 1
    else:
        log_info("No hay cambios locales pendientes")
    
    # Verificar remote origin
    if not run_command("git remote get-url origin"):
        log_error("No se encontró remote 'origin'")
        log_info("Configura tu repositorio GitHub primero.")
        return 1
    
    # Obtener info del repositorio
    username, repo_name = get_repo_info()
    if not username or not repo_name:
        log_warning("No se pudo obtener información del repositorio")
    else:
        log_success(f"Repositorio: {username}/{repo_name}")
    
    # Sincronizar con remoto
    log_info("Sincronizando con repositorio remoto...")
    if run_command("git pull origin main --no-edit", capture_output=False):
        log_success("Repositorio sincronizado")
    else:
        log_warning("Problemas de sincronización detectados")
        # Verificar conflictos
        status_output = run_command("git status")
        if status_output and 'both modified' in status_output:
            log_error("Conflictos de merge detectados")
            log_info("Resuélvelos manualmente y vuelve a ejecutar el script.")
            run_command("git status", capture_output=False)
            return 1
    
    # Push cambios
    log_info("Subiendo cambios a GitHub...")
    if run_command("git push origin main", capture_output=False):
        log_success("¡Cambios subidos exitosamente a GitHub!")
    else:
        log_error("Error al subir cambios")
        log_info("Verifica tu conexión y permisos.")
        return 1
    
    # Mostrar resumen
    if username and repo_name:
        github_pages_url = f"https://{username}.github.io/{repo_name}"
        
        print("\n" + "="*55)
        print("   🎉 ¡PORTAFOLIO ACTUALIZADO EXITOSAMENTE!")
        print("="*55)
        
        print("\n📋 RESUMEN DE LA ACTUALIZACIÓN:")
        print(f"   └── Repositorio: {username}/{repo_name}")
        print("   └── Branch: main")
        
        last_commit = run_command("git log -1 --pretty=format:'%h - %s (%cr)'")
        if last_commit:
            print(f"   └── Último commit: {last_commit}")
        
        print("\n🌐 URLs IMPORTANTES:")
        print(f"   └── Portafolio: {github_pages_url}")
        print(f"   └── Repositorio: https://github.com/{username}/{repo_name}")
        print(f"   └── Settings: https://github.com/{username}/{repo_name}/settings/pages")
        
        log_info("⏱️  GitHub Pages tardará 2-3 minutos en actualizarse")
        log_info("🔄 Limpia la caché del navegador si no ves los cambios inmediatamente")
        
        # Preguntar si abrir navegador
        open_browser = input("\n¿Deseas abrir el portafolio en el navegador? (y/N): ").strip().lower()
        if open_browser == 'y':
            log_info("Abriendo navegador...")
            try:
                webbrowser.open(github_pages_url)
            except:
                log_warning("No se pudo abrir el navegador automáticamente")
                print(f"Copia esta URL: {github_pages_url}")
        
        print("\n💡 TIPS ÚTILES:")
        print("   └── Para agregar proyectos: node js/add-project.js")
        print("   └── Para ver el estado: git status")
        print("   └── Para ver commits: git log --oneline -5")
        print("   └── Para revertir: git revert HEAD")
        
        log_success("✨ ¡Todo listo! Tu portafolio está actualizado y en línea.")
    
    print("\n" + log_success("🏁 Script completado exitosamente") + "\n")
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}⚠️  Operación cancelada por el usuario{Colors.END}")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}❌ Error inesperado: {e}{Colors.END}")
        sys.exit(1)