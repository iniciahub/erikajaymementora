document.addEventListener('DOMContentLoaded', () => {

    /* ==================== MENU MOBILE ==================== */
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close');

    if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
    if (navClose) navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

    const navLink = document.querySelectorAll('.nav__link');
    navLink.forEach(n => n.addEventListener('click', () => navMenu.classList.remove('show-menu')));

    /* ==================== HEADER COM SCROLL ==================== */
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scroll-header', window.scrollY >= 50);
    });

    /* ==================== ANIMAÇÃO DE SCROLL ==================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    /* ==================== FAQ ACORDEÃO ==================== */
    document.querySelectorAll('.faq__item').forEach((item) => {
        const header = item.querySelector('.faq__header');
        header.addEventListener('click', () => {
            const openItem = document.querySelector('.faq__item.active');
            if (openItem && openItem !== item) openItem.classList.remove('active');
            item.classList.toggle('active');
        });
    });
});
