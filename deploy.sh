#!/bin/bash

# Script para deploy automático del portafolio
# Uso: ./deploy.sh o bash deploy.sh

echo "🚀 Iniciando deploy del portafolio..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes con colores
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

# Verificar si git está inicializado
if [ ! -d ".git" ]; then
    log_error "No se encontró repositorio git. Inicializando..."
    git init
    log_success "Repositorio git inicializado"
fi

# Verificar si hay cambios para commit
if git diff-index --quiet HEAD --; then
    log_warning "No hay cambios para hacer commit"
else
    log_info "Detectados cambios. Creando commit..."
    
    # Agregar todos los archivos
    git add .
    
    # Crear commit con timestamp
    commit_message="Update portfolio - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"
    
    log_success "Commit creado: $commit_message"
fi

# Verificar si existe el remote origin
if ! git remote get-url origin &> /dev/null; then
    log_warning "No se encontró remote 'origin'"
    log_info "Para configurar GitHub:"
    echo "1. Crea un repositorio en GitHub llamado 'mi-portafolio'"
    echo "2. Ejecuta: git remote add origin https://github.com/TU-USUARIO/mi-portafolio.git"
    echo "3. Ejecuta: git push -u origin main"
    exit 1
fi

# Push a GitHub
log_info "Subiendo cambios a GitHub..."
if git push origin main; then
    log_success "Cambios subidos a GitHub exitosamente"
else
    log_error "Error al subir cambios a GitHub"
    exit 1
fi

# Verificar si GitHub Pages está configurado
log_info "Verificando configuración de GitHub Pages..."

# Obtener información del repositorio
REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename "$REPO_URL" .git)
USERNAME=$(basename $(dirname "$REPO_URL"))

# Construir URL de GitHub Pages
if [[ $USERNAME != *"github.com"* ]]; then
    GITHUB_PAGES_URL="https://${USERNAME}.github.io/${REPO_NAME}"
    log_success "Tu portafolio debería estar disponible en: $GITHUB_PAGES_URL"
    log_info "Si es la primera vez, puede tardar unos minutos en estar disponible"
    log_info "Verifica la configuración en: https://github.com/${USERNAME}/${REPO_NAME}/settings/pages"
else
    log_warning "No se pudo determinar la URL de GitHub Pages automáticamente"
fi

echo ""
log_success "🎉 Deploy completado exitosamente!"

echo ""
log_info "📋 Pasos adicionales recomendados:"
echo "1. Verifica que GitHub Pages esté habilitado en la configuración del repositorio"
echo "2. Asegúrate de que el branch 'main' esté seleccionado como fuente"
echo "3. Personaliza tu archivo config.js con tu información"
echo "4. Agrega tus imágenes en la carpeta assets/images/"

# Preguntar si abrir el navegador (solo en sistemas que lo soporten)
if command -v open &> /dev/null || command -v xdg-open &> /dev/null || command -v start &> /dev/null; then
    read -p "¿Deseas abrir GitHub Pages en el navegador? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if command -v open &> /dev/null; then
            open "$GITHUB_PAGES_URL"
        elif command -v xdg-open &> /dev/null; then
            xdg-open "$GITHUB_PAGES_URL"
        elif command -v start &> /dev/null; then
            start "$GITHUB_PAGES_URL"
        fi
    fi
fi

echo "✨ ¡Listo! Tu portafolio está en línea."