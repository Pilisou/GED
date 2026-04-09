
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const overlay = document.getElementById('mobile-overlay');

        // Ouvrir le menu
        menuBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêche le scroll derrière
        });

        // Fermer le menu
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Logique Accordéon simple
        const accHeaders = document.querySelectorAll('.accordion-header');
        accHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const body = header.nextElementSibling;
                if(body) {
                    body.style.display = body.style.display === 'block' ? 'none' : 'block';
                    header.querySelector('.plus-icon').textContent = body.style.display === 'block' ? '−' : '+';
                }
            });
        });