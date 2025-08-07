import CONFIG from './config.js';

/* =============== SHOW MENU =============== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* =============== REMOVE MENU MOBILE =============== */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* =============== ACCORDION SKILLS =============== */
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/* =============== PORTFOLIO FILTER =============== */
const portfolioFilters = document.querySelectorAll('.portfolio__item');

function filterPortfolio() {
    const filter = this.getAttribute('data-filter');
    const portfolioCards = document.querySelectorAll('.portfolio__card');
    
    // Update active filter
    portfolioFilters.forEach(item => item.classList.remove('portfolio__item-active'));
    this.classList.add('portfolio__item-active');
    
    // Filter projects
    portfolioCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', filterPortfolio);
});

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* =============== CHANGE BACKGROUND HEADER =============== */ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* =============== SHOW SCROLL UP =============== */ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* =============== DARK LIGHT THEME =============== */ 
const themeButton = document.getElementById('theme-toggle')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.querySelector('i').classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.querySelector('i').classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* =============== LANGUAGE TOGGLE =============== */
const langButton = document.getElementById('lang-toggle')
let currentLang = localStorage.getItem('selected-lang') || 'es'

// Function to change language
function changeLanguage(lang) {
    currentLang = lang
    const translations = CONFIG.translations[lang]
    const personalInfo = CONFIG.personal.info[lang]
    
    if (!translations || !personalInfo) return
    
    // Update navigation
    document.querySelector('a[href="#home"] span').textContent = translations.nav.home
    document.querySelector('a[href="#about"] span').textContent = translations.nav.about
    document.querySelector('a[href="#skills"] span').textContent = translations.nav.skills
    document.querySelector('a[href="#projects"] span').textContent = translations.nav.projects
    document.querySelector('a[href="#contact"] span').textContent = translations.nav.contact
    
    // Update home section with personal info
    document.querySelector('.home__title').innerHTML = `${translations.home.greeting} <span id="home-name">${CONFIG.personal.name}</span>`
    document.querySelector('#home-title').textContent = personalInfo.title
    document.querySelector('#home-bio').textContent = personalInfo.bio
    document.querySelector('.button:not(.button--white) .button__icon').previousSibling.textContent = `${translations.home.contact_btn} `
    document.querySelector('#download-cv').innerHTML = `${translations.home.download_cv} <i class="fas fa-download button__icon"></i>`
    document.querySelector('.home__scroll-name').textContent = translations.home.scroll_down
    
    // Update about section
    document.querySelector('#about .section__title').textContent = translations.about.title
    document.querySelector('#about .section__subtitle').textContent = translations.about.subtitle
    document.querySelector('#about-description').textContent = personalInfo.about
    document.querySelector('.about__info div:nth-child(1) .about__info-name').innerHTML = translations.about.projects_completed
    document.querySelector('.about__info div:nth-child(2) .about__info-name').innerHTML = translations.about.years_experience
    document.querySelector('.about__info div:nth-child(3) .about__info-name').innerHTML = translations.about.clients_satisfied
    
    // Update skills section
    document.querySelector('#skills .section__title').textContent = translations.skills.title
    document.querySelector('#skills .section__subtitle').textContent = translations.skills.subtitle
    const skillsSubtitles = document.querySelectorAll('.skills__subtitle')
    skillsSubtitles.forEach(subtitle => {
        if (subtitle.textContent.includes('ESTUDIANTE') || subtitle.textContent.includes('STUDENT')) {
            subtitle.textContent = translations.skills.student
        }
    })
    
    // Update projects section
    document.querySelector('#projects .section__title').textContent = translations.projects.title
    document.querySelector('#projects .section__subtitle').textContent = translations.projects.subtitle
    
    // Update contact section
    document.querySelector('#contact .section__title').textContent = translations.contact.title
    document.querySelector('#contact .section__subtitle').textContent = translations.contact.subtitle
    document.querySelector('#contact-location').textContent = personalInfo.location
    document.querySelector('label[for="contact-name"]').textContent = translations.contact.name_label
    document.querySelector('label[for="contact-email-input"]').textContent = translations.contact.email_label
    document.querySelector('label[for="contact-subject"]').textContent = translations.contact.subject_label
    document.querySelector('label[for="contact-message"]').textContent = translations.contact.message_label
    document.querySelector('.contact__form button[type="submit"]').innerHTML = `${translations.contact.send_btn} <i class="fas fa-paper-plane button__icon"></i>`
    
    // Update footer
    document.querySelector('#footer-name').textContent = CONFIG.personal.name
    document.querySelector('#footer-title').textContent = personalInfo.title
    
    // Save language preference
    localStorage.setItem('selected-lang', lang)
    
    // Update button icon
    const langIcon = langButton.querySelector('i')
    langIcon.className = lang === 'es' ? 'fas fa-globe' : 'fas fa-globe-americas'
}

// Initialize language
changeLanguage(currentLang)

// Language toggle event
langButton.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es'
    changeLanguage(newLang)
})

/* =============== CONTACT FORM =============== */
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message-status');

const sendEmail = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Simulate sending email (replace with your email service)
    showMessage('Enviando mensaje...', 'success');
    
    // In a real implementation, you would send the email here
    setTimeout(() => {
        showMessage('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        contactForm.reset();
    }, 2000);
};

const showMessage = (message, type) => {
    contactMessage.textContent = message;
    contactMessage.className = `contact__message show ${type}`;
    
    setTimeout(() => {
        contactMessage.classList.remove('show');
    }, 5000);
};

contactForm.addEventListener('submit', sendEmail);

/* =============== LOADER =============== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

/* =============== LOAD CONFIGURATION =============== */
function loadConfiguration() {
    try {
        // Load personal information
        loadPersonalInfo();
        
        // Load projects
        loadProjects();
        
        // Load skills
        loadSkills();
        
        // Load social links
        loadSocialLinks();
        
        // Apply theme configuration
        applyThemeConfig();
        
        // Update SEO
        updateSEO();
        
        console.log('✅ Configuration loaded successfully');
    } catch (error) {
        console.error('❌ Error loading configuration:', error);
    }
}

function loadPersonalInfo() {
    const personal = CONFIG.personal;
    const lang = localStorage.getItem('selected-lang') || 'es';
    const personalInfo = personal.info[lang];
    
    // Update navigation
    const navName = document.getElementById('nav-name');
    if (navName) {
        navName.textContent = personal.name;
    }
    
    // Update home section
    const homeName = document.getElementById('home-name');
    const homeTitle = document.getElementById('home-title');
    const homeBio = document.getElementById('home-bio');
    
    if (homeName) {
        homeName.textContent = personal.name;
    }
    if (homeTitle && personalInfo) {
        homeTitle.textContent = personalInfo.title;
    }
    if (homeBio && personalInfo) {
        homeBio.textContent = personalInfo.bio;
    }
    
    // Update about section
    const aboutDescription = document.getElementById('about-description');
    if (aboutDescription && personalInfo) {
        aboutDescription.textContent = personalInfo.about;
    }
    
    // Update contact section
    const contactPhone = document.getElementById('contact-phone');
    const contactEmail = document.getElementById('contact-email');
    const contactLocation = document.getElementById('contact-location');
    
    if (contactPhone) {
        contactPhone.textContent = personal.phone;
    }
    if (contactEmail) {
        contactEmail.textContent = personal.email;
    }
    if (contactLocation && personalInfo) {
        contactLocation.textContent = personalInfo.location;
    }
    
    // Update footer
    const footerName = document.getElementById('footer-name');
    const footerTitle = document.getElementById('footer-title');
    const footerCopyName = document.getElementById('footer-copy-name');
    const currentYear = document.getElementById('current-year');
    
    if (footerName) {
        footerName.textContent = personal.name;
    }
    if (footerTitle && personalInfo) {
        footerTitle.textContent = personalInfo.title;
    }
    if (footerCopyName) {
        footerCopyName.textContent = personal.name;
    }
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Update CV download link
    const downloadCvLink = document.querySelector('#download-cv');
    if (downloadCvLink && personal.resume !== '[ENLACE A TU CV - ej: https://drive.google.com/file/d/tu-cv-id/view]') {
        downloadCvLink.href = personal.resume;
    }
}

function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const projectsEmpty = document.getElementById('projects-empty');
    
    if (CONFIG.projects && CONFIG.projects.length > 0) {
        // Hide empty state
        if (projectsEmpty) {
            projectsEmpty.style.display = 'none';
        }
        
        // Clear container
        const existingCards = projectsContainer.querySelectorAll('.portfolio__card');
        existingCards.forEach(card => card.remove());
        
        // Add projects
        CONFIG.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
        
        // Update projects count
        const projectsCount = document.getElementById('projects-count');
        if (projectsCount) {
            projectsCount.textContent = String(CONFIG.projects.length).padStart(2, '0') + '+';
        }
    } else {
        // Show empty state
        if (projectsEmpty) {
            projectsEmpty.style.display = 'block';
        }
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `portfolio__card ${project.category || ''} ${project.featured ? 'portfolio__featured' : ''}`;
    
    const technologies = project.technologies ? 
        project.technologies.map(tech => `<span class="portfolio__tech">${tech}</span>`).join('') 
        : '';
    
    const links = [];
    if (project.demo) {
        links.push(`<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="portfolio__link">
            <i class="fas fa-external-link-alt"></i> Demo
        </a>`);
    }
    if (project.github) {
        links.push(`<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="portfolio__link">
            <i class="fab fa-github"></i> Código
        </a>`);
    }
    
    card.innerHTML = `
        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="portfolio__img">` : ''}
        <div class="portfolio__data">
            <h3 class="portfolio__title">${project.title}</h3>
            <p class="portfolio__description">${project.description}</p>
            ${technologies ? `<div class="portfolio__technologies">${technologies}</div>` : ''}
            ${links.length > 0 ? `<div class="portfolio__links">${links.join('')}</div>` : ''}
        </div>
    `;
    
    return card;
}

function loadSkills() {
    const frontendSkills = document.getElementById('frontend-skills');
    const backendSkills = document.getElementById('backend-skills');
    const toolsSkills = document.getElementById('tools-skills');
    
    if (CONFIG.skills) {
        if (frontendSkills && CONFIG.skills.frontend) {
            loadSkillsSection(frontendSkills, CONFIG.skills.frontend);
        }
        if (backendSkills && CONFIG.skills.backend) {
            loadSkillsSection(backendSkills, CONFIG.skills.backend);
        }
        if (toolsSkills && CONFIG.skills.tools) {
            loadSkillsSection(toolsSkills, CONFIG.skills.tools);
        }
    }
}

function loadSkillsSection(container, skills) {
    container.innerHTML = '';
    skills.forEach(skill => {
        // Manejar tanto el formato nuevo (objeto) como el antiguo (string)
        const skillName = typeof skill === 'object' ? skill.name : skill;
        const skillPercentage = typeof skill === 'object' ? skill.percentage : 85;
        
        const skillElement = document.createElement('div');
        skillElement.className = 'skills__data';
        skillElement.innerHTML = `
            <div class="skills__titles">
                <h3 class="skills__name">${skillName}</h3>
                <span class="skills__number">${skillPercentage}%</span>
            </div>
            <div class="skills__bar">
                <span class="skills__percentage skills__${skillName.toLowerCase().replace(/[^a-z0-9]/g, '')}" style="width: ${skillPercentage}%"></span>
            </div>
        `;
        container.appendChild(skillElement);
    });
}

function loadSocialLinks() {
    const socialLinksContainer = document.getElementById('social-links');
    const footerSocials = document.getElementById('footer-socials');
    
    if (CONFIG.social && socialLinksContainer) {
        socialLinksContainer.innerHTML = '';
        Object.entries(CONFIG.social).forEach(([platform, data]) => {
            if (data.url && !data.url.includes('[')) {
                const link = document.createElement('a');
                link.href = data.url;
                link.className = 'home__social-icon';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.innerHTML = `<i class="${data.icon}"></i>`;
                socialLinksContainer.appendChild(link);
            }
        });
    }
    
    if (CONFIG.social && footerSocials) {
        footerSocials.innerHTML = '';
        Object.entries(CONFIG.social).forEach(([platform, data]) => {
            if (data.url && !data.url.includes('[')) {
                const link = document.createElement('a');
                link.href = data.url;
                link.className = 'footer__social';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.innerHTML = `<i class="${data.icon}"></i>`;
                footerSocials.appendChild(link);
            }
        });
    }
}

function applyThemeConfig() {
    if (CONFIG.theme) {
        const root = document.documentElement;
        
        // Convert hex to hsl if needed
        if (CONFIG.theme.primaryColor && CONFIG.theme.primaryColor !== '#3b82f6') {
            // You can implement hex to hsl conversion here if needed
            // For now, just update the hue-color variable
        }
    }
}

function updateSEO() {
    if (CONFIG.seo) {
        // Update title
        if (CONFIG.seo.title && CONFIG.seo.title !== '[TU NOMBRE] - [TU TÍTULO]') {
            document.title = CONFIG.seo.title;
        }
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && CONFIG.seo.description && CONFIG.seo.description !== '[DESCRIPCIÓN META - 150-160 caracteres]') {
            metaDescription.setAttribute('content', CONFIG.seo.description);
        }
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && CONFIG.seo.keywords && CONFIG.seo.keywords !== 'desarrollador, programador, frontend, backend, [TUS TECNOLOGÍAS]') {
            metaKeywords.setAttribute('content', CONFIG.seo.keywords);
        }
        
        // Update meta author
        const metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor && CONFIG.seo.author && CONFIG.seo.author !== '[TU NOMBRE]') {
            metaAuthor.setAttribute('content', CONFIG.seo.author);
        }
    }
}

/* =============== SCROLL ANIMATIONS =============== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

/* =============== INITIALIZE APP =============== */
document.addEventListener('DOMContentLoaded', () => {
    loadConfiguration();
});

// Re-export CONFIG for use in other scripts
window.PORTFOLIO_CONFIG = CONFIG;