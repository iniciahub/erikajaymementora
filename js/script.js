document.addEventListener('DOMContentLoaded', () => {

    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- SIDE MENU (NAVIGATION) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.side-menu__link');

    const toggleMenu = () => {
        sideMenu.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
        document.body.style.overflow = sideMenu.classList.contains('is-active') ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita o pulo imediato
            toggleMenu();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            setTimeout(() => { // Dá tempo para o menu fechar antes de rolar
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }, 400);
        });
    });

    // --- SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- SMART POP-UP ---
    const smartPopup = document.getElementById('smart-popup');
    const closePopup = document.getElementById('popup-close');
    const ctaPopup = document.getElementById('popup-cta');

    const showPopup = () => {
        if (!sessionStorage.getItem('popupShown')) {
            smartPopup.classList.add('is-active');
            sessionStorage.setItem('popupShown', 'true');
        }
    };

    const hidePopup = () => {
        smartPopup.classList.remove('is-active');
    };

    setTimeout(showPopup, 30000); // Mostra o pop-up após 30 segundos
    closePopup.addEventListener('click', hidePopup);
    ctaPopup.addEventListener('click', (e) => {
        e.preventDefault();
        hidePopup();
        document.querySelector('#diagnostico').scrollIntoView({ behavior: 'smooth' });
    });
});
