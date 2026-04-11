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


// Seleksyone tout kat aksyon yo
const actionCards = document.querySelectorAll('.action-card');

actionCards.forEach(card => {
    card.addEventListener('click', () => {
        const opsyon = card.querySelector('span').innerText;
        
        // 1. MEMORIZASYON (Sove l nan sesyon an)
        localStorage.setItem('denye_opsyon', opsyon);
        console.log("Opsyon chwazi: " + opsyon);

        // 2. ANIMASYON FÈMTI (Pa twò brit)
        // Nou ba li yon ti delè pou moun nan wè klik la
        card.style.backgroundColor = "#e8f5e9"; // Yon ti flash vèt
        
        setTimeout(() => {
            const overlay = document.getElementById('mobile-overlay');
            
            // Nou rann fèmti a dous ak CSS transition
            overlay.style.opacity = "0";
            overlay.style.transform = "translateX(-20px)"; // Li glise yon ti kras
            
            setTimeout(() => {
                overlay.classList.remove('active');
                // Remete style yo nòmal pou pwochen fwa
                overlay.style.opacity = "1";
                overlay.style.transform = "translateX(0)";
                document.body.style.overflow = 'auto';
                
                // 3. REDIREKSYON OUBYEN FILTRAJ
                // Isit la ou ka mete lojik pou filtre paj la selon 'opsyon' an
                alert("Ou chwazi: " + opsyon + " pilisou poko ban m done yo");
                
            }, 400); // Tan pou animasyon an fini
        }, 200);
    });
});