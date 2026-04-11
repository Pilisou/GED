const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('mobile-overlay');

// Ouvrir le menu
menuBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
});

// Fermer le menu
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Logique Accordéon
const accHeaders = document.querySelectorAll('.accordion-header');

accHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const body = header.nextElementSibling;
        const icon = header.querySelector('.circle-icon');

        // 1. FILTRAJ: Fermen lòt yo
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherBody = otherItem.querySelector('.accordion-body');
                if (otherBody) otherBody.style.maxHeight = null;
                
                const otherIcon = otherItem.querySelector('.circle-icon');
                // CHIRIJI: Nou chanje icon nan sèlman si se PA flèch la (no-plus)
                if (otherIcon && !otherItem.classList.contains('no-plus')) {
                    otherIcon.innerText = '+';
                }
            }
        });

        // 2. TOGGLE: Louvri oswa fèmen
        item.classList.toggle('active');

        if (item.classList.contains('active')) {
            if (body) body.style.maxHeight = body.scrollHeight + "px";
            // CHIRIJI: Pa mete "-" si se bouton flèch la
            if (icon && !item.classList.contains('no-plus')) {
                icon.innerText = '−';
            }
        } else {
            if (body) body.style.maxHeight = null;
            // CHIRIJI: Pa mete "+" si se bouton flèch la
            if (icon && !item.classList.contains('no-plus')) {
                icon.innerText = '+';
            }
        }
    });
});