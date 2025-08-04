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

    /* ==================== LÓGICA DO MODAL DE DIAGNÓSTICO ==================== */
    const openModalBtn1 = document.getElementById('open-diagnostico-modal');
    const openModalBtn2 = document.getElementById('open-diagnostico-modal-2');
    const closeModalBtn = document.getElementById('close-diagnostico-modal');
    const modalOverlay = document.getElementById('diagnostico-modal');
    const formDiagnostico = document.getElementById('form-diagnostico');
    const enviarBtn = document.getElementById('enviar-diagnostico');

    const openModal = () => {
        modalOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        modalOverlay.classList.remove('is-active');
        document.body.style.overflow = 'auto';
    };

    if (openModalBtn1) openModalBtn1.addEventListener('click', openModal);
    if (openModalBtn2) openModalBtn2.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });

    if (formDiagnostico) {
        enviarBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const nome = document.getElementById('diag-nome').value;
            const email = document.getElementById('diag-email').value;
            const renda = document.getElementById('diag-renda').value;
            const situacao = document.querySelector('input[name="situacao"]:checked')?.value || "Não preenchido";
            const dificuldade = document.getElementById('diag-dificuldade').value;
            const objetivo = document.getElementById('diag-objetivo').value;

            if (!nome || !email || !renda || situacao === "Não preenchido") {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            let mensagem = `Olá Erika, aqui está meu diagnóstico!\n\n*--- DIAGNÓSTICO FINANCEIRO ---*\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n\n*Fonte de Renda:* ${renda}\n*Situação Atual:* ${situacao}\n\n*Maior Dificuldade Hoje:*\n${dificuldade}\n\n*Principal Objetivo em 1 Ano:*\n${objetivo}\n`;
            const encodedMessage = encodeURIComponent(mensagem);
            const whatsappURL = `https://wa.me/5531998364682?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
            closeModal();
            formDiagnostico.reset();
        });
    }
});
