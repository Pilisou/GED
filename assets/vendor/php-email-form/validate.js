(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      // SA A SE LI KI BLOKE FENÈT FORMSPREE A
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').style.display = 'block';
      thisForm.querySelector('.error-message').style.display = 'none';
      thisForm.querySelector('.sent-message').style.display = 'none';

      let formData = new FormData(thisForm);

      // Voye done yo san chanje paj
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        thisForm.querySelector('.loading').style.display = 'none';
        if (response.ok) {
          // AFICHE MESAJ SIKSÈ A
          let sentMsg = thisForm.querySelector('.sent-message');
          sentMsg.style.display = 'block';
          
          // VIDE TOUT CHAN YO
          thisForm.reset();

          // DISPARÈT APRE 2 SEGONN
          setTimeout(function() {
            sentMsg.style.display = 'none';
          }, 2000);
        } else {
          throw new Error('Erè nan voye mesaj la.');
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').style.display = 'none';
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').style.display = 'block';
  }

})();