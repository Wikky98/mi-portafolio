# 🚀 Mi Portafolio Personal

Un portafolio personal moderno, responsive y totalmente personalizable construido con HTML5, CSS3 y JavaScript vanilla. Diseñado para ser escalable y fácil de mantener.

![Portfolio Preview](assets/images/portfolio-preview.jpg)

## ✨ Características

- **🎨 Diseño moderno y profesional** - Interfaz limpia con animaciones suaves
- **📱 Totalmente responsive** - Optimizado para todos los dispositivos
- **🌓 Tema oscuro/claro** - Switch automático con preferencias guardadas
- **⚡ Alto rendimiento** - Carga rápida y optimizada
- **🔧 Fácilmente personalizable** - Configuración centralizada en un solo archivo
- **📊 Secciones completas** - Hero, Sobre mí, Habilidades, Proyectos, Contacto
- **✉️ Formulario funcional** - Con validación y feedback visual
- **🏷️ Filtros de proyectos** - Sistema de categorización dinámico
- **🔄 Actualización dinámica** - Sin necesidad de editar HTML directamente

## 📁 Estructura del Proyecto

```
mi-portafolio/
├── 📄 index.html              # Página principal
├── 📄 README.md               # Documentación
├── 📂 css/
│   └── 📄 styles.css          # Estilos principales
├── 📂 js/
│   ├── 📄 config.js           # ⚙️ Configuración personalizable
│   ├── 📄 main.js             # Funcionalidad principal
│   └── 📄 add-project.js      # 🛠️ Utilidad para agregar proyectos
└── 📂 assets/
    ├── 📂 images/             # Imágenes del sitio
    │   ├── 🖼️ profile.jpg     # Foto de perfil
    │   ├── 🖼️ about.jpg       # Imagen sección "sobre mí"
    │   └── 🖼️ og-image.jpg    # Imagen para redes sociales
    └── 📂 icons/              # Iconos y favicon
        ├── 🎯 favicon.ico
        └── 🍎 apple-touch-icon.png
```

## 🚀 Inicio Rápido

### 1. Descarga o Clona

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mi-portafolio.git
cd mi-portafolio
```

### 2. Personalizar Configuración

Edita el archivo `js/config.js` con tu información:

```javascript
const CONFIG = {
  personal: {
    name: 'Tu Nombre Completo',
    title: 'Tu Título Profesional',
    email: 'tu@email.com',
    github: 'tu-usuario-github',
    linkedin: 'tu-usuario-linkedin',
    bio: 'Tu descripción profesional aquí...'
  },
  // ... más configuraciones
};
```

### 3. Agregar tus Imágenes

- `assets/images/profile.jpg` - Tu foto de perfil (recomendado: 400x400px)
- `assets/images/about.jpg` - Imagen para la sección "sobre mí"
- `assets/images/og-image.jpg` - Imagen para compartir en redes sociales

### 4. Abrir en el Navegador

Simplemente abre `index.html` en tu navegador favorito o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (live-server)
npx live-server

# Con VS Code Live Server extension
# Click derecho en index.html > "Open with Live Server"
```

## ⚙️ Personalización Detallada

### 🎨 Colores y Tema

Modifica las variables CSS en `css/styles.css`:

```css
:root {
  --hue-color: 230; /* Cambia el color principal */
  --first-color: hsl(var(--hue-color), 69%, 61%);
  /* ... más variables */
}
```

O personaliza desde `js/config.js`:

```javascript
theme: {
  primaryColor: '#3b82f6',
  secondaryColor: '#1f2937',
  accentColor: '#f59e0b'
}
```

### 📝 Información Personal

Actualiza todos los textos editando `js/config.js`:

```javascript
const CONFIG = {
  personal: {
    name: 'Juan Pérez',
    title: 'Desarrollador Full Stack',
    email: 'juan@ejemplo.com',
    phone: '+1 234 567 8900',
    location: 'Ciudad, País',
    github: 'juanperez',
    linkedin: 'juan-perez-dev',
    bio: 'Desarrollador apasionado con 3+ años de experiencia...',
    resume: 'https://drive.google.com/file/d/tu-cv'
  }
}
```

### 🛠️ Habilidades

Personaliza las habilidades técnicas:

```javascript
skills: {
  frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'],
  backend: ['Node.js', 'Python', 'PHP', 'Java'],
  tools: ['Git', 'Docker', 'AWS', 'VS Code'],
  databases: ['MySQL', 'MongoDB', 'PostgreSQL']
}
```

### 📱 Redes Sociales

Configura todos tus enlaces sociales:

```javascript
social: {
  github: {
    url: 'https://github.com/tu-usuario',
    icon: 'fab fa-github'
  },
  linkedin: {
    url: 'https://linkedin.com/in/tu-usuario',
    icon: 'fab fa-linkedin'
  },
  // Agrega más redes sociales...
}
```

## 📂 Gestión de Proyectos

### ➕ Agregar Proyectos Manualmente

Edita la sección `projects` en `js/config.js`:

```javascript
projects: [
  {
    id: 1,
    title: 'Aplicación Web E-commerce',
    description: 'Plataforma completa de comercio electrónico con carrito de compras...',
    image: 'assets/images/proyecto1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/usuario/ecommerce',
    demo: 'https://mi-ecommerce.vercel.app',
    category: 'web',
    featured: true
  }
]
```

### 🤖 Agregar Proyectos con Script Automático

Usa el script interactivo para agregar proyectos fácilmente:

```bash
# Agregar nuevo proyecto (interactivo)
node js/add-project.js

# Ver proyectos existentes
node js/add-project.js list

# Ver ayuda
node js/add-project.js help
```

### 📊 Categorías de Proyectos

Los proyectos se pueden filtrar por categorías:
- `web` - Aplicaciones web
- `app` - Aplicaciones móviles
- `design` - Diseños y UI/UX

## ✉️ Formulario de Contacto

El formulario incluye validación automática y está preparado para integrar con servicios como:

- **EmailJS** - Para envío directo desde el frontend
- **Formspree** - Servicio de formularios sin backend
- **Netlify Forms** - Si despliegas en Netlify
- **Tu propio backend** - API personalizada

### Configurar EmailJS (Recomendado)

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Crea un servicio de email
3. Agrega estas líneas antes del cierre de `</body>` en `index.html`:

```html
<script src=\"https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js\"></script>
<script>
  emailjs.init('TU_PUBLIC_KEY');
</script>
```

4. Modifica la función `sendEmail` en `js/main.js`

## 🌐 Deployment

### GitHub Pages (Recomendado)

1. **Crear repositorio en GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Add complete portfolio"
git branch -M main
git remote add origin https://github.com/tu-usuario/mi-portafolio.git
git push -u origin main
```

2. **Activar GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige "main" branch y "/ (root)"
   - Tu sitio estará en: `https://tu-usuario.github.io/mi-portafolio`

### Otras Opciones de Hosting

- **Netlify**: Arrastra la carpeta del proyecto o conecta con GitHub
- **Vercel**: `npx vercel` o conecta con GitHub
- **Firebase Hosting**: `firebase deploy`
- **Surge.sh**: `npm install -g surge && surge`

## 🎯 SEO y Optimización

### Meta Tags Configurables

Personaliza el SEO desde `js/config.js`:

```javascript
seo: {
  title: 'Juan Pérez - Desarrollador Full Stack',
  description: 'Portafolio de Juan Pérez, desarrollador con experiencia en React, Node.js y más.',
  keywords: 'desarrollador, react, nodejs, javascript, full stack',
  author: 'Juan Pérez'
}
```

### Optimizaciones Incluidas

- ✅ Semantic HTML5
- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Twitter Cards
- ✅ Favicon y Apple Touch Icon
- ✅ Loading lazy para imágenes
- ✅ Minificación de recursos
- ✅ Compresión Gzip

## 🛠️ Desarrollo

### Scripts Disponibles

Agrega estos scripts a tu `package.json`:

```json
{
  \"scripts\": {
    \"dev\": \"live-server --port=3000\",
    \"add-project\": \"node js/add-project.js\",
    \"build\": \"npm run minify-css && npm run minify-js\",
    \"minify-css\": \"csso css/styles.css --output css/styles.min.css\",
    \"minify-js\": \"terser js/main.js --output js/main.min.js\"
  }
}
```

### Estructura de Desarrollo

```bash
# Instalar dependencias de desarrollo (opcional)
npm init -y
npm install -D live-server csso terser

# Ejecutar servidor de desarrollo
npm run dev

# Agregar nuevo proyecto
npm run add-project

# Construir para producción
npm run build
```

## 🎨 Personalización Avanzada

### Agregar Nuevas Secciones

1. **Agregar HTML** en `index.html`:
```html
<section class=\"nueva-seccion section\" id=\"nueva\">
  <!-- Contenido -->
</section>
```

2. **Agregar estilos** en `css/styles.css`:
```css
.nueva-seccion {
  /* Tus estilos */
}
```

3. **Agregar navegación** en el menú:
```html
<li class=\"nav__item\">
  <a href=\"#nueva\" class=\"nav__link\">
    <i class=\"fas fa-icon nav__icon\"></i>
    <span>Nueva</span>
  </a>
</li>
```

### Cambiar Animaciones

Modifica las animaciones CSS en `css/styles.css`:

```css
@keyframes nuevaAnimacion {
  from { /* estado inicial */ }
  to { /* estado final */ }
}

.mi-elemento {
  animation: nuevaAnimacion 0.5s ease-in-out;
}
```

## 🐛 Troubleshooting

### Problemas Comunes

**❌ Los cambios en config.js no se reflejan:**
- Verifica que no haya errores de sintaxis en JavaScript
- Asegúrate de que el archivo se esté cargando correctamente
- Revisa la consola del navegador para errores

**❌ Las imágenes no cargan:**
- Verifica que las rutas en config.js sean correctas
- Asegúrate de que las imágenes existan en `assets/images/`
- Usa rutas relativas (sin barra inicial)

**❌ El formulario no funciona:**
- Configura un servicio de email (EmailJS recomendado)
- Revisa que no haya errores en la consola
- Verifica la configuración de CORS si usas un backend

**❌ Errores en el script add-project.js:**
- Asegúrate de tener Node.js instalado
- Verifica permisos de escritura en el archivo config.js
- Ejecuta desde la carpeta raíz del proyecto

### Obtener Ayuda

- 🐛 [Reportar un bug](https://github.com/tu-usuario/mi-portafolio/issues)
- 💬 [Hacer una pregunta](https://github.com/tu-usuario/mi-portafolio/discussions)
- 📧 Email: tu@email.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🙏 Agradecimientos

- [Font Awesome](https://fontawesome.com) - Iconos
- [Google Fonts](https://fonts.google.com) - Tipografías
- [Unsplash](https://unsplash.com) - Imágenes de ejemplo

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!**

**Desarrollado con ❤️ para desarrolladores que buscan destacar profesionalmente**