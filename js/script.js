document.addEventListener('DOMContentLoaded', () => {

    // --- MENU LATERAL ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.side-menu__link');

    const toggleMenu = () => {
        sideMenu.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

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

    // Função para mostrar o pop-up
    const showPopup = () => {
        // Verifica se o pop-up já foi mostrado nesta sessão
        if (!sessionStorage.getItem('popupShown')) {
            smartPopup.classList.add('is-active');
            sessionStorage.setItem('popupShown', 'true');
        }
    };

    // Função para esconder o pop-up
    const hidePopup = () => {
        smartPopup.classList.remove('is-active');
    };

    // Dispara o pop-up após 30 segundos
    setTimeout(showPopup, 30000);

    // Event listeners para fechar o pop-up
    closePopup.addEventListener('click', hidePopup);
    ctaPopup.addEventListener('click', hidePopup); // Esconde ao clicar no CTA também

});
