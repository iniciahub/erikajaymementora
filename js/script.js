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
        ctaPopup.addEventListener('click', () => {
            hidePopup();
            // Abre o modal de diagnóstico ao clicar no CTA do pop-up
            openModal();
        });
    }

    // --- LÓGICA DO MODAL DE DIAGNÓSTICO ---
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
