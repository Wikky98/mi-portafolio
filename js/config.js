const CONFIG = {
  personal: {
    name: 'JONATHAN',
    email: 'https://github.com/Wikky98',
    phone: '+5491138607339',
    github: 'Wikky98',
    linkedin: 'jonathan-nusz-2a4848208',
    resume: '[ENLACE A TU CV - ej: https://drive.google.com/file/d/tu-cv-id/view]',
    
    // Información multiidioma
    info: {
      es: {
        title: 'DESARROLLADOR IA',
        location: 'BUENOS AIRES, ARGENTINA',
        bio: 'Desarrollador en Formación | Entusiasta de IA y Tecnología. Explorador tecnológico apasionado por desvelar los misterios de la programación web y la inteligencia artificial. Mi viaje incluye dominar HTML, CSS, JavaScript y Python, con una mirada hacia el futuro digital. Comprometido con el aprendizaje continuo y la innovación tecnológica.',
        about: 'Mi meta es convertirme en un desarrollador de software especializado en soluciones de inteligencia artificial, combinando mi pasión por la tecnología con mi capacidad de resolver problemas complejos. Busco constantemente proyectos que me permitan aprender y crecer profesionalmente.'
      },
      en: {
        title: 'AI DEVELOPER',
        location: 'BUENOS AIRES, ARGENTINA',
        bio: 'Developer in Training | AI and Technology Enthusiast. Technological explorer passionate about unraveling the mysteries of web programming and artificial intelligence. My journey includes mastering HTML, CSS, JavaScript and Python, with a look towards the digital future. Committed to continuous learning and technological innovation.',
        about: 'My goal is to become a software developer specialized in artificial intelligence solutions, combining my passion for technology with my ability to solve complex problems. I constantly seek projects that allow me to learn and grow professionally.'
      }
    }
  },
  
  projects: [
    // Ejemplo de estructura de proyecto - eliminar después de agregar proyectos reales
    // {
    //   id: 1,
    //   title: 'Nombre del Proyecto',
    //   description: 'Descripción breve del proyecto',
    //   image: 'assets/images/proyecto1.jpg',
    //   technologies: ['HTML', 'CSS', 'JavaScript'],
    //   github: 'https://github.com/usuario/proyecto',
    //   demo: 'https://demo-proyecto.com',
    //   featured: true
    // }
  ],

  skills: {
    frontend: [
      { name: 'HTML5', percentage: 35 },
      { name: 'CSS3', percentage: 35 },
      { name: 'JavaScript', percentage: 5 }
    ],
    backend: [
      { name: 'Python', percentage: 70 },
      { name: 'Django', percentage: 40 }
    ],
    tools: [
      { name: 'Git', percentage: 25 },
      { name: 'VS Code', percentage: 60 }
    ],
    databases: [
      { name: 'MySQL', percentage: 75 },
      { name: 'Postgres', percentage: 70 }
    ]
  },

  social: {
    github: {
      url: 'https://github.com/Wikky98',
      icon: 'fab fa-github'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/jonathan-nusz-2a4848208/',
      icon: 'fab fa-linkedin'
    },
    email: {
      url: 'mailto:jony.trabajos98@gmail.com',
      icon: 'fas fa-envelope'
    }
  },

  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1f2937',
    accentColor: '#f59e0b',
    backgroundColor: '#ffffff',
    textColor: '#1f2937'
  },

  seo: {
    title: 'JONATHAN - DESARROLLADOR IA',
    description: 'Desarrollador en Formación | Entusiasta de IA y Tecnología. Explorador tecnológico apasionado por desvelar los misterios de la programación web y la inteligencia artificial. Mi viaje incluye dominar HTML, CSS, JavaScript y Python, con una mirada hacia el futuro digital. Comprometido con el aprendizaje continuo y la innovación tecnológica.',
    keywords: 'desarrollador, programador, frontend, backend, django, pyhon, mysql, postgres, html, css, javascript, vite',
    author: 'JONATHAN'
  },

  // Traducciones
  translations: {
    es: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mí',
        skills: 'Habilidades',
        projects: 'Proyectos',
        contact: 'Contacto'
      },
      home: {
        greeting: 'Hola, soy',
        contact_btn: 'Contactar',
        download_cv: 'Descargar CV',
        scroll_down: 'Scroll down'
      },
      about: {
        title: 'Sobre mí',
        subtitle: 'Mi introducción',
        projects_completed: 'Proyectos<br>completados',
        years_experience: 'Años de<br>experiencia',
        clients_satisfied: 'Clientes<br>satisfechos'
      },
      skills: {
        title: 'Habilidades',
        subtitle: 'Mi nivel técnico',
        frontend: 'Frontend Developer',
        backend: 'Backend Developer',
        tools: 'Herramientas',
        student: 'ESTUDIANTE',
        daily_use: 'Uso diario'
      },
      projects: {
        title: 'Proyectos',
        subtitle: 'Trabajos más recientes',
        all: 'Todo',
        web: 'Web',
        app: 'App',
        design: 'Diseño',
        coming_soon: 'Próximamente',
        empty_description: 'Los proyectos se mostrarán aquí una vez que sean agregados.'
      },
      contact: {
        title: 'Contacto',
        subtitle: 'Ponte en contacto',
        whatsapp: 'WhatsApp',
        email: 'Email',
        location: 'Ubicación',
        name_label: 'Nombre',
        email_label: 'Email',
        subject_label: 'Asunto',
        message_label: 'Mensaje',
        send_btn: 'Enviar Mensaje'
      },
      footer: {
        rights: 'Todos los derechos reservados.'
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      },
      home: {
        greeting: 'Hi, I am',
        contact_btn: 'Contact',
        download_cv: 'Download CV',
        scroll_down: 'Scroll down'
      },
      about: {
        title: 'About me',
        subtitle: 'My introduction',
        projects_completed: 'Completed<br>projects',
        years_experience: 'Years of<br>experience',
        clients_satisfied: 'Satisfied<br>clients'
      },
      skills: {
        title: 'Skills',
        subtitle: 'My technical level',
        frontend: 'Frontend Developer',
        backend: 'Backend Developer',
        tools: 'Tools',
        student: 'STUDENT',
        daily_use: 'Daily use'
      },
      projects: {
        title: 'Projects',
        subtitle: 'Most recent works',
        all: 'All',
        web: 'Web',
        app: 'App',
        design: 'Design',
        coming_soon: 'Coming soon',
        empty_description: 'Projects will be displayed here once they are added.'
      },
      contact: {
        title: 'Contact',
        subtitle: 'Get in touch',
        whatsapp: 'WhatsApp',
        email: 'Email',
        location: 'Location',
        name_label: 'Name',
        email_label: 'Email',
        subject_label: 'Subject',
        message_label: 'Message',
        send_btn: 'Send Message'
      },
      footer: {
        rights: 'All rights reserved.'
      }
    }
  }
};

export default CONFIG;