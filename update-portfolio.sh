#!/bin/bash

# SCRIPT AUTOMÁTICO PARA ACTUALIZAR PORTAFOLIO DESPLEGADO
# Uso: ./update-portfolio.sh o bash update-portfolio.sh

echo "🚀 ACTUALIZADOR AUTOMÁTICO DE PORTAFOLIO"
echo "======================================="

# Colores para terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Funciones para mensajes con colores
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_question() {
    echo -e "${PURPLE}❓ $1${NC}"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "js/config.js" ]; then
    log_error "No se encontró js/config.js. Asegúrate de estar en la carpeta del portafolio."
    exit 1
fi

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
    log_error "No se encontró repositorio git. Inicializa git primero."
    exit 1
fi

# Verificar conexión a internet
log_info "Verificando conexión..."
if ! ping -c 1 google.com &> /dev/null; then
    log_error "Sin conexión a internet. Verifica tu conexión."
    exit 1
fi
log_success "Conexión verificada"

# Verificar estado del repositorio
log_info "Verificando estado del repositorio..."

# Verificar si hay cambios sin commits
if ! git diff-index --quiet HEAD --; then
    log_warning "Hay cambios sin hacer commit"
    
    echo ""
    log_question "¿Qué quieres hacer?"
    echo "1) Auto-commit todos los cambios"
    echo "2) Ver los cambios primero"
    echo "3) Cancelar"
    
    read -p "Selecciona una opción (1-3): " choice
    
    case $choice in
        1)
            log_info "Haciendo commit automático de todos los cambios..."
            git add .
            
            # Generar mensaje de commit inteligente
            TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
            COMMIT_MSG="🔄 Auto-update portfolio - $TIMESTAMP"
            
            # Detectar tipo de cambios
            if git diff --cached --name-only | grep -q "js/config.js"; then
                if git diff --cached js/config.js | grep -q '"title":\|"description":\|"technologies":'; then
                    COMMIT_MSG="📂 Add/update projects - $TIMESTAMP"
                elif git diff --cached js/config.js | grep -q '"name":\|"email":\|"bio":'; then
                    COMMIT_MSG="👤 Update personal info - $TIMESTAMP"
                fi
            fi
            
            if git diff --cached --name-only | grep -q "assets/images/"; then
                COMMIT_MSG="🖼️  Update images - $TIMESTAMP"
            fi
            
            git commit -m "$COMMIT_MSG"
            log_success "Commit creado: $COMMIT_MSG"
            ;;
        2)
            echo ""
            log_info "Cambios detectados:"
            git status --porcelain
            echo ""
            log_info "Detalles de los cambios:"
            git diff --stat
            echo ""
            read -p "¿Continuar con el commit? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git add .
                TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
                git commit -m "🔄 Manual update portfolio - $TIMESTAMP"
                log_success "Commit creado"
            else
                log_warning "Operación cancelada por el usuario"
                exit 0
            fi
            ;;
        3)
            log_warning "Operación cancelada por el usuario"
            exit 0
            ;;
        *)
            log_error "Opción inválida"
            exit 1
            ;;
    esac
else
    log_info "No hay cambios locales pendientes"
fi

# Verificar remote origin
if ! git remote get-url origin &> /dev/null; then
    log_error "No se encontró remote 'origin'. Configura tu repositorio GitHub primero."
    exit 1
fi

# Obtener información del repositorio
REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename "$REPO_URL" .git)
USERNAME=$(basename $(dirname "$REPO_URL") | sed 's/.*://')

log_success "Repositorio: $USERNAME/$REPO_NAME"

# Pull antes de push (por si hay cambios remotos)
log_info "Sincronizando con repositorio remoto..."
if git pull origin main --no-edit; then
    log_success "Repositorio sincronizado"
else
    log_warning "Conflictos detectados o problemas de sincronización"
    log_info "Intentando resolver automáticamente..."
    
    # Verificar si hay conflictos
    if git status | grep -q "both modified"; then
        log_error "Conflictos de merge detectados. Resuélvelos manualmente y vuelve a ejecutar el script."
        git status
        exit 1
    fi
fi

# Push de los cambios
log_info "Subiendo cambios a GitHub..."
if git push origin main; then
    log_success "¡Cambios subidos exitosamente a GitHub!"
else
    log_error "Error al subir cambios. Verifica tu conexión y permisos."
    exit 1
fi

# Construcción del URL de GitHub Pages
if [[ $USERNAME != *"github.com"* ]]; then
    GITHUB_PAGES_URL="https://${USERNAME}.github.io/${REPO_NAME}"
    
    echo ""
    log_success "🎉 ¡PORTAFOLIO ACTUALIZADO EXITOSAMENTE!"
    echo ""
    echo "📋 RESUMEN DE LA ACTUALIZACIÓN:"
    echo "   └── Repositorio: $USERNAME/$REPO_NAME"
    echo "   └── Branch: main"
    echo "   └── Último commit: $(git log -1 --pretty=format:'%h - %s (%cr)')"
    echo ""
    echo "🌐 URLs IMPORTANTES:"
    echo "   └── Portafolio: $GITHUB_PAGES_URL"
    echo "   └── Repositorio: https://github.com/$USERNAME/$REPO_NAME"
    echo "   └── Settings: https://github.com/$USERNAME/$REPO_NAME/settings/pages"
    echo ""
    
    log_info "⏱️  GitHub Pages tardará 2-3 minutos en actualizarse"
    log_info "🔄 Limpia la caché del navegador si no ves los cambios inmediatamente"
    
    # Preguntar si abrir el navegador
    echo ""
    read -p "¿Deseas abrir el portafolio en el navegador? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Abriendo navegador..."
        
        # Detectar sistema operativo y abrir navegador
        if command -v explorer.exe &> /dev/null; then
            # Windows (WSL)
            explorer.exe "$GITHUB_PAGES_URL"
        elif command -v open &> /dev/null; then
            # macOS
            open "$GITHUB_PAGES_URL"
        elif command -v xdg-open &> /dev/null; then
            # Linux
            xdg-open "$GITHUB_PAGES_URL"
        elif command -v start &> /dev/null; then
            # Windows
            start "$GITHUB_PAGES_URL"
        else
            log_warning "No se pudo abrir el navegador automáticamente"
            echo "Copia esta URL: $GITHUB_PAGES_URL"
        fi
    fi
    
    echo ""
    log_success "✨ ¡Todo listo! Tu portafolio está actualizado y en línea."
    
    # Tips adicionales
    echo ""
    echo "💡 TIPS ÚTILES:"
    echo "   └── Para agregar proyectos: node js/add-project.js"
    echo "   └── Para ver el estado: git status"
    echo "   └── Para ver commits: git log --oneline -5"
    echo "   └── Para revertir: git revert HEAD"
    
else
    log_warning "No se pudo determinar la URL de GitHub Pages automáticamente"
    log_success "Cambios subidos exitosamente a GitHub"
fi

echo ""
log_success "🏁 Script completado exitosamente"