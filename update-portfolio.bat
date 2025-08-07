@echo off
setlocal enabledelayedexpansion

REM SCRIPT AUTOMÁTICO PARA ACTUALIZAR PORTAFOLIO DESPLEGADO (WINDOWS)
REM Uso: update-portfolio.bat o doble click

title Actualizador de Portafolio
color 0A

echo.
echo  =====================================================
echo   🚀 ACTUALIZADOR AUTOMATICO DE PORTAFOLIO
echo  =====================================================
echo.

REM Verificar si estamos en el directorio correcto
if not exist "js\config.js" (
    echo ❌ Error: No se encontro js\config.js
    echo    Asegurate de estar en la carpeta del portafolio.
    echo.
    pause
    exit /b 1
)

REM Verificar si git está disponible
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Git no está instalado o no está en el PATH
    echo    Instala Git desde: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

REM Verificar si es un repositorio git
if not exist ".git" (
    echo ❌ Error: No es un repositorio git
    echo    Inicializa git primero: git init
    echo.
    pause
    exit /b 1
)

echo ℹ️  Verificando estado del repositorio...

REM Verificar si hay cambios
git diff-index --quiet HEAD -- >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  Hay cambios sin hacer commit
    echo.
    echo ❓ ¿Que quieres hacer?
    echo    1) Auto-commit todos los cambios
    echo    2) Ver los cambios primero  
    echo    3) Cancelar
    echo.
    set /p "choice=Selecciona una opcion (1-3): "
    
    if "!choice!"=="1" (
        echo.
        echo ℹ️  Haciendo commit automatico de todos los cambios...
        git add .
        
        REM Generar timestamp
        for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
        set timestamp=!datetime:~0,4!-!datetime:~4,2!-!datetime:~6,2! !datetime:~8,2!:!datetime:~10,2!:!datetime:~12,2!
        
        REM Commit con mensaje automático
        git commit -m "🔄 Auto-update portfolio - !timestamp!"
        echo ✅ Commit creado exitosamente
        
    ) else if "!choice!"=="2" (
        echo.
        echo ℹ️  Cambios detectados:
        git status --porcelain
        echo.
        set /p "confirm=¿Continuar con el commit? (y/N): "
        if /i "!confirm!"=="y" (
            git add .
            for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
            set timestamp=!datetime:~0,4!-!datetime:~4,2!-!datetime:~6,2! !datetime:~8,2!:!datetime:~10,2!:!datetime:~12,2!
            git commit -m "🔄 Manual update portfolio - !timestamp!"
            echo ✅ Commit creado
        ) else (
            echo ⚠️  Operacion cancelada por el usuario
            pause
            exit /b 0
        )
        
    ) else if "!choice!"=="3" (
        echo ⚠️  Operacion cancelada por el usuario
        pause
        exit /b 0
        
    ) else (
        echo ❌ Opcion invalida
        pause
        exit /b 1
    )
) else (
    echo ✅ No hay cambios locales pendientes
)

REM Verificar remote origin
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: No se encontro remote 'origin'
    echo    Configura tu repositorio GitHub primero.
    echo.
    pause
    exit /b 1
)

REM Obtener información del repositorio
for /f "delims=" %%i in ('git remote get-url origin') do set REPO_URL=%%i
for %%i in ("!REPO_URL!") do set REPO_NAME=%%~ni
for /f "tokens=1 delims=/" %%i in ("!REPO_URL:*/=!") do (
    for /f "tokens=1 delims=." %%j in ("%%i") do set USERNAME=%%j
)

REM Limpiar USERNAME si viene con dominio
for /f "tokens=2 delims=:" %%i in ("!REPO_URL!") do (
    for /f "tokens=1 delims=/" %%j in ("%%i") do set USERNAME=%%j
)

echo ✅ Repositorio: !USERNAME!/!REPO_NAME!

echo.
echo ℹ️  Sincronizando con repositorio remoto...
git pull origin main --no-edit
if errorlevel 1 (
    echo ⚠️  Problemas de sincronización detectados
    echo ℹ️  Intentando resolver...
    
    REM Verificar conflictos
    git status | findstr "both modified" >nul
    if not errorlevel 1 (
        echo ❌ Conflictos de merge detectados
        echo    Resuelve los conflictos manualmente y vuelve a ejecutar
        git status
        pause
        exit /b 1
    )
) else (
    echo ✅ Repositorio sincronizado
)

echo.
echo ℹ️  Subiendo cambios a GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ Error al subir cambios
    echo    Verifica tu conexion y permisos
    echo.
    pause
    exit /b 1
) else (
    echo ✅ ¡Cambios subidos exitosamente a GitHub!
)

REM Construir URL de GitHub Pages
set GITHUB_PAGES_URL=https://!USERNAME!.github.io/!REPO_NAME!

echo.
echo  =====================================================
echo   🎉 ¡PORTAFOLIO ACTUALIZADO EXITOSAMENTE!
echo  =====================================================
echo.
echo 📋 RESUMEN DE LA ACTUALIZACION:

REM Obtener último commit
for /f "delims=" %%i in ('git log -1 --pretty=format:"%%h - %%s"') do set LAST_COMMIT=%%i

echo    └── Repositorio: !USERNAME!/!REPO_NAME!
echo    └── Branch: main  
echo    └── Ultimo commit: !LAST_COMMIT!
echo.
echo 🌐 URLs IMPORTANTES:
echo    └── Portafolio: !GITHUB_PAGES_URL!
echo    └── Repositorio: https://github.com/!USERNAME!/!REPO_NAME!
echo    └── Settings: https://github.com/!USERNAME!/!REPO_NAME!/settings/pages
echo.
echo ℹ️  GitHub Pages tardara 2-3 minutos en actualizarse
echo ℹ️  Limpia la cache del navegador si no ves los cambios
echo.

set /p "open_browser=¿Deseas abrir el portafolio en el navegador? (y/N): "
if /i "!open_browser!"=="y" (
    echo ℹ️  Abriendo navegador...
    start "" "!GITHUB_PAGES_URL!"
)

echo.
echo 💡 TIPS UTILES:
echo    └── Para agregar proyectos: node js/add-project.js
echo    └── Para ver el estado: git status
echo    └── Para ver commits: git log --oneline -5
echo    └── Para revertir: git revert HEAD
echo.

echo ✅ Script completado exitosamente
echo.
pause