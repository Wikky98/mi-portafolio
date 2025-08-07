#!/usr/bin/env node

/**
 * ADD PROJECT UTILITY SCRIPT
 * 
 * Este script facilita agregar nuevos proyectos al portafolio
 * de forma interactiva desde la línea de comandos.
 * 
 * Uso:
 *   node js/add-project.js
 *   npm run add-project (si agregas el script a package.json)
 * 
 * También se puede usar como módulo:
 *   import { addProject } from './js/add-project.js'
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const CONFIG_PATH = path.join(process.cwd(), 'js', 'config.js');

// Colores para terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Interface para input del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Función para hacer preguntas al usuario
 */
function question(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

/**
 * Función para mostrar mensajes con colores
 */
function log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
}

/**
 * Función para validar entrada
 */
function validateInput(input, type = 'text', required = true) {
    if (required && (!input || input.trim() === '')) {
        return 'Este campo es requerido';
    }
    
    if (type === 'url' && input && !isValidUrl(input)) {
        return 'Por favor ingresa una URL válida';
    }
    
    return true;
}

/**
 * Función para validar URLs
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Función para leer el archivo de configuración
 */
function readConfig() {
    try {
        if (!fs.existsSync(CONFIG_PATH)) {
            throw new Error('Archivo config.js no encontrado');
        }
        
        const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
        
        // Extraer el objeto CONFIG del archivo
        const match = configContent.match(/const CONFIG = ({[\s\S]*?});/);
        if (!match) {
            throw new Error('No se pudo encontrar el objeto CONFIG');
        }
        
        // Usar Function constructor para evaluar el objeto
        const configObj = new Function('return ' + match[1])();
        return { content: configContent, config: configObj };
    } catch (error) {
        throw new Error(`Error leyendo config.js: ${error.message}`);
    }
}

/**
 * Función para escribir el archivo de configuración
 */
function writeConfig(content) {
    try {
        fs.writeFileSync(CONFIG_PATH, content, 'utf-8');
        log('✅ Archivo config.js actualizado exitosamente', 'green');
    } catch (error) {
        throw new Error(`Error escribiendo config.js: ${error.message}`);
    }
}

/**
 * Función para agregar un proyecto al array
 */
function addProjectToConfig(configData, newProject) {
    const { content, config } = configData;
    
    // Generar ID único
    const existingIds = config.projects.map(p => p.id || 0);
    const newId = Math.max(0, ...existingIds) + 1;
    newProject.id = newId;
    
    // Convertir el proyecto a string
    const projectString = JSON.stringify(newProject, null, 4)
        .replace(/"([^"]+)":/g, '$1:'); // Remover comillas de las keys
    
    // Encontrar la posición del array projects
    const projectsStart = content.indexOf('projects: [');
    const projectsEnd = content.indexOf(']', projectsStart);
    
    const beforeProjects = content.substring(0, projectsStart);
    const afterProjects = content.substring(projectsEnd);
    
    // Verificar si el array está vacío o tiene elementos
    const projectsSection = content.substring(projectsStart, projectsEnd + 1);
    const hasExistingProjects = projectsSection.includes('{');
    
    let newContent;
    if (hasExistingProjects) {
        // Agregar coma y el nuevo proyecto
        newContent = beforeProjects + 'projects: [\n    ' + projectString.split('\n').join('\n    ') + ',\n\n' + afterProjects;
    } else {
        // Primer proyecto
        newContent = beforeProjects + 'projects: [\n    ' + projectString.split('\n').join('\n    ') + '\n' + afterProjects;
    }
    
    return newContent;
}

/**
 * Función principal para agregar proyecto interactivamente
 */
async function addProjectInteractive() {
    log('\n🚀 AGREGAR NUEVO PROYECTO AL PORTAFOLIO', 'cyan');
    log('===============================================', 'cyan');
    
    try {
        const configData = readConfig();
        
        log('\n📝 Completa la información del proyecto:', 'yellow');
        log('(Los campos marcados con * son obligatorios)\n');
        
        // Recopilar información del proyecto
        const project = {};
        
        // Título
        while (true) {
            const title = await question('Título del proyecto *: ');
            const validation = validateInput(title, 'text', true);
            if (validation === true) {
                project.title = title.trim();
                break;
            }
            log(validation, 'red');
        }
        
        // Descripción
        while (true) {
            const description = await question('Descripción breve *: ');
            const validation = validateInput(description, 'text', true);
            if (validation === true) {
                project.description = description.trim();
                break;
            }
            log(validation, 'red');
        }
        
        // Imagen (opcional)
        const image = await question('Ruta de la imagen (ej: assets/images/project.jpg): ');
        if (image && image.trim()) {
            project.image = image.trim();
        }
        
        // Tecnologías
        while (true) {
            const techInput = await question('Tecnologías *\n(separadas por comas, ej: HTML, CSS, JavaScript): ');
            const validation = validateInput(techInput, 'text', true);
            if (validation === true) {
                project.technologies = techInput.split(',').map(tech => tech.trim()).filter(tech => tech);
                break;
            }
            log(validation, 'red');
        }
        
        // GitHub URL (opcional)
        while (true) {
            const github = await question('URL del repositorio GitHub: ');
            if (!github || github.trim() === '') {
                break;
            }
            const validation = validateInput(github, 'url', false);
            if (validation === true) {
                project.github = github.trim();
                break;
            }
            log(validation, 'red');
        }
        
        // Demo URL (opcional)
        while (true) {
            const demo = await question('URL del demo en vivo: ');
            if (!demo || demo.trim() === '') {
                break;
            }
            const validation = validateInput(demo, 'url', false);
            if (validation === true) {
                project.demo = demo.trim();
                break;
            }
            log(validation, 'red');
        }
        
        // Categoría para filtros
        const categories = ['web', 'app', 'design'];
        log('\nCategorías disponibles: ' + categories.join(', '));
        const category = await question('Categoría (opcional): ');
        if (category && categories.includes(category.toLowerCase())) {
            project.category = category.toLowerCase();
        }
        
        // Proyecto destacado
        const featured = await question('¿Es un proyecto destacado? (s/N): ');
        project.featured = featured.toLowerCase().startsWith('s');
        
        // Mostrar resumen
        log('\n📋 RESUMEN DEL PROYECTO:', 'magenta');
        log('========================', 'magenta');
        console.log(JSON.stringify(project, null, 2));
        
        // Confirmar
        const confirm = await question('\n¿Confirmas agregar este proyecto? (S/n): ');
        if (confirm.toLowerCase().startsWith('n')) {
            log('❌ Operación cancelada', 'red');
            rl.close();
            return;
        }
        
        // Agregar proyecto
        const newContent = addProjectToConfig(configData, project);
        writeConfig(newContent);
        
        log(`\n✅ Proyecto "${project.title}" agregado exitosamente!`, 'green');
        log('\n📌 Próximos pasos:', 'yellow');
        log('1. Agrega la imagen del proyecto si la especificaste');
        log('2. Actualiza el navegador para ver los cambios');
        log('3. Considera hacer commit de los cambios a git\n');
        
    } catch (error) {
        log(`❌ Error: ${error.message}`, 'red');
    } finally {
        rl.close();
    }
}

/**
 * Función para agregar proyecto programáticamente
 */
export function addProject(projectData) {
    try {
        const configData = readConfig();
        const newContent = addProjectToConfig(configData, projectData);
        writeConfig(newContent);
        return true;
    } catch (error) {
        console.error('Error agregando proyecto:', error.message);
        return false;
    }
}

/**
 * Función para listar proyectos existentes
 */
function listProjects() {
    try {
        const { config } = readConfig();
        
        log('\n📂 PROYECTOS EXISTENTES:', 'cyan');
        log('========================', 'cyan');
        
        if (config.projects.length === 0) {
            log('No hay proyectos agregados aún.\n', 'yellow');
            return;
        }
        
        config.projects.forEach((project, index) => {
            log(`\n${index + 1}. ${project.title}`, 'bright');
            log(`   ${project.description}`);
            if (project.technologies) {
                log(`   Tecnologías: ${project.technologies.join(', ')}`, 'blue');
            }
            if (project.github) log(`   GitHub: ${project.github}`, 'green');
            if (project.demo) log(`   Demo: ${project.demo}`, 'green');
            if (project.featured) log('   ⭐ Destacado', 'yellow');
        });
        
        log('');
    } catch (error) {
        log(`❌ Error: ${error.message}`, 'red');
    }
}

/**
 * Función de ayuda
 */
function showHelp() {
    log('\n🔧 UTILIDAD PARA AGREGAR PROYECTOS', 'cyan');
    log('===================================', 'cyan');
    log('\nUso:');
    log('  node js/add-project.js [comando]', 'bright');
    log('\nComandos disponibles:');
    log('  (sin comando)  - Agregar nuevo proyecto (interactivo)');
    log('  list          - Listar proyectos existentes');
    log('  help          - Mostrar esta ayuda');
    log('\nEjemplos:');
    log('  node js/add-project.js', 'green');
    log('  node js/add-project.js list', 'green');
    log('  node js/add-project.js help', 'green');
    log('\n💡 Tip: Puedes agregar este script a tu package.json para facilitar el uso:');
    log('  "add-project": "node js/add-project.js"', 'blue');
    log('');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    const command = process.argv[2];
    
    switch (command) {
        case 'list':
            listProjects();
            break;
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
        default:
            addProjectInteractive();
            break;
    }
}