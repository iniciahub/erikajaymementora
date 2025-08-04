document.addEventListener('DOMContentLoaded', () => {

    // Adiciona classe ao body para ativar animações via CSS de forma segura
    document.body.classList.add('js-enabled');

    // --- EFEITO DE SCROLL NO HEADER ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- MENU LATERAL (HAMBÚRGUER) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.side-menu__link');

    const toggleMenu = () => {
        sideMenu.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
        document.body.style.overflow = sideMenu.classList.contains('is-active') ? 'hidden' : '';
    };

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (sideMenu.classList.contains('is-active')) {
                toggleMenu();
            }

            setTimeout(() => {
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - header.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    });

    // --- ANIMAÇÃO DE SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- POP-UP INTELIGENTE ---
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

    if (smartPopup) {
        setTimeout(showPopup, 30000); // 30 segundos
        closePopup.addEventListener('click', hidePopup);
        // O CTA do pop-up é um link <a>, então não precisa de JS extra para o clique
        // Apenas para fechar o pop-up caso o link não abra em nova aba
        ctaPopup.addEventListener('click', hidePopup);
    }
});
