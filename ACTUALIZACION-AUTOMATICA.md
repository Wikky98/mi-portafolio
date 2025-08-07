# 🚀 ACTUALIZACIÓN AUTOMÁTICA DEL PORTAFOLIO

¡Con solo ejecutar un script, tu portafolio se actualiza automáticamente en GitHub Pages!

## ⚡ Uso Rápido

### Windows:
```cmd
# Opción 1: Doble click en el archivo
update-portfolio.bat

# Opción 2: Desde terminal
.\update-portfolio.bat
```

### Linux/macOS:
```bash
# Opción 1: Script Bash
./update-portfolio.sh

# Opción 2: Script Python
python update-portfolio.py
```

### Universal (cualquier sistema con Python):
```bash
python update-portfolio.py
```

## 🎯 ¿Qué hace el script automáticamente?

### ✅ Verificaciones de Seguridad:
- Verifica que estés en el directorio correcto
- Confirma que Git esté instalado y configurado
- Valida que el repositorio esté conectado a GitHub
- Detecta conflictos de merge automáticamente

### 🔄 Gestión de Cambios:
- **Auto-detecta cambios** sin commit
- **Genera mensajes inteligentes** de commit:
  - 📂 "Add/update projects" si modificaste proyectos
  - 👤 "Update personal info" si cambiaste tu información
  - 🖼️ "Update images" si agregaste/modificaste imágenes
  - 🔄 "Auto-update portfolio" para cambios generales

### 🚀 Deployment Automático:
- Sincroniza con GitHub (pull)
- Sube todos los cambios (push)
- **Abre automáticamente** tu portafolio actualizado
- Proporciona URLs importantes y estadísticas

## 📋 Flujo de Trabajo Típico

### Scenario 1: Agregar nuevo proyecto
```bash
# 1. Agregar proyecto
node js/add-project.js

# 2. Actualizar portafolio (UN SOLO COMANDO)
./update-portfolio.sh

# ¡LISTO! Tu proyecto aparece en 2-3 minutos
```

### Scenario 2: Cambiar tu información
```bash
# 1. Editar js/config.js (cambiar bio, skills, etc.)

# 2. Actualizar portafolio (UN SOLO COMANDO) 
python update-portfolio.py

# ¡LISTO! Los cambios están online
```

### Scenario 3: Actualización completa
```bash
# 1. Hacer múltiples cambios:
#    - Editar información personal
#    - Agregar nuevas imágenes
#    - Modificar proyectos
#    - Ajustar estilos

# 2. Un solo comando lo maneja todo:
.\update-portfolio.bat

# ¡LISTO! Todo actualizado automáticamente
```

## 🛡️ Características de Seguridad

### 🔍 Detección Inteligente:
- **Previene errores**: No permite push si hay conflictos
- **Backup automático**: Hace pull antes de push
- **Validación de cambios**: Te muestra qué va a cambiar
- **Rollback fácil**: Te dice cómo revertir si algo sale mal

### 🎛️ Control Total:
```
❓ ¿Qué quieres hacer?
   1) Auto-commit todos los cambios      ← Automático
   2) Ver los cambios primero           ← Revisión manual  
   3) Cancelar                          ← Salida segura
```

## 🌐 URLs y Accesos Directos

Al finalizar, el script te proporciona:

```
🌐 URLs IMPORTANTES:
   └── Portafolio: https://tu-usuario.github.io/mi-portafolio
   └── Repositorio: https://github.com/tu-usuario/mi-portafolio
   └── Settings: https://github.com/tu-usuario/mi-portafolio/settings/pages

💡 TIPS ÚTILES:
   └── Para agregar proyectos: node js/add-project.js
   └── Para ver el estado: git status
   └── Para ver commits: git log --oneline -5
   └── Para revertir: git revert HEAD
```

## ⚙️ Personalización Avanzada

### Alias para Terminal (Opcional):
```bash
# Linux/macOS - Agregar a ~/.bashrc o ~/.zshrc:
alias update-portfolio="cd /ruta/a/tu/portafolio && ./update-portfolio.sh"

# Windows PowerShell - Agregar a $PROFILE:
function Update-Portfolio { cd "C:\ruta\a\tu\portafolio"; .\update-portfolio.bat }

# Uso desde cualquier directorio:
update-portfolio
```

### Programación de Actualizaciones (Opcional):
```bash
# Linux/macOS - Cron job para actualización diaria:
0 9 * * * cd /ruta/a/tu/portafolio && ./update-portfolio.sh

# Windows - Task Scheduler:
# Crear tarea programada que ejecute update-portfolio.bat
```

## 🚨 Troubleshooting

### ❌ "No se encontró js/config.js":
```bash
# Solución: Navegar al directorio correcto
cd mi-portafolio
./update-portfolio.sh
```

### ❌ "Git no está instalado":
- **Windows**: Descargar de https://git-scm.com/download/win
- **Linux**: `sudo apt install git`
- **macOS**: `brew install git`

### ❌ "No se encontró remote 'origin'":
```bash
# Solución: Configurar repositorio GitHub
git remote add origin https://github.com/tu-usuario/mi-portafolio.git
```

### ❌ "Conflictos de merge detectados":
```bash
# El script te mostrará los archivos en conflicto
# Edita manualmente y luego:
git add .
git commit -m "Resolve conflicts"
./update-portfolio.sh
```

### ❌ "Error al subir cambios":
- Verificar conexión a internet
- Verificar permisos de GitHub
- Verificar que el repositorio existe

## 🎉 Beneficios del Sistema Automático

### ⚡ **Velocidad**:
- **Antes**: 6-8 comandos manuales
- **Ahora**: 1 comando automático

### 🛡️ **Seguridad**:
- **Antes**: Riesgo de errores manuales
- **Ahora**: Validaciones automáticas

### 📊 **Visibilidad**:
- **Antes**: Comandos ciegos
- **Ahora**: Feedback completo y colorido

### 🎯 **Simplicidad**:
- **Antes**: Recordar secuencia de comandos
- **Ahora**: Un script hace todo

---

## 🚀 **¡Resultado Final!**

**Con un solo comando:**
1. ✅ Detecta todos tus cambios
2. ✅ Crea commits con mensajes inteligentes  
3. ✅ Sincroniza con GitHub
4. ✅ Despliega automáticamente
5. ✅ Abre tu portafolio actualizado
6. ✅ Te da estadísticas y URLs útiles

**¡Tu portafolio siempre actualizado sin complicaciones! 🎯**