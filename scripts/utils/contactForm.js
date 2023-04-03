const contactCloseBtn = document.querySelector('.contact-modal__close-btn');
const contactModal = document.getElementById('contact-modal');
const mainDocument = document.getElementById('main');

contactCloseBtn.addEventListener('click', closeContactModal);

function displayModal () {
  // create white lightbox for contact form
  const lightbox = document.createElement('div');
  lightbox.setAttribute('id', 'contact-modal-lightbox');
  mainDocument.setAttribute('aria-hidden', 'true');
  document.body.appendChild(lightbox);

  contactModal.style.display = 'block';
  contactModal.setAttribute('aria-modal', 'true');
  contactModal.setAttribute('aria-hidden', 'false');
  document.getElementById('contact-lastName').focus();
  trapFocusContactModal();

  const contactForm = document.forms['contact-form'];
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
    closeContactModal();
  });
}

function closeContactModal () {
  contactModal.style.display = 'none';
  contactModal.setAttribute('aria-hidden', 'true');
  mainDocument.setAttribute('aria-hidden', 'false');
  document.getElementById('contact-modal-lightbox').remove();
}

function formValidation () {
  const contactFirstName = document.getElementById('contact-firstName');
  const contactLastName = document.getElementById('contact-lastName');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');

  if (contactFirstName.value === '') {
    return alert('Veuillez indiquer votre prénom.');
  }

  if (contactLastName.value === '') {
    return alert('Veuillez indiquer votre nom.');
  }

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (contactEmail.value === '' || !regex.test(contactEmail.value)) {
    return alert('Veuillez indiquer votre adresse mail.');
  }

  if (contactMessage.value === '') {
    alert('Veuillez ajouter un message.');
    return false;
  }

  console.log('====================================');
  console.log(`Prénom: ${contactFirstName.value}`);
  console.log(`Nom: ${contactLastName.value}`);
  console.log(`Email: ${contactEmail.value}`);
  console.log(`Message: ${contactMessage.value}`);
  console.log('====================================');
  console.log('Form successfully submitted!');
}

function trapFocusContactModal () {
  const focusItems = contactModal.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled])');
  const firstFocusItem = focusItems[0];
  const lastFocusItem = focusItems[focusItems.length - 1];

  contactModal.addEventListener('keydown', function (e) {
    const isTabPressed = (e.key === 'Tab');

    if (!isTabPressed) { return; }

    // if shift + tab is pressed (preventDefault avoids button to be skipped over)
    if (e.shiftKey) {
      if (document.activeElement === firstFocusItem) {
        lastFocusItem.focus();
        e.preventDefault();
      }
      // else = tab only is pressed
    } else {
      if (document.activeElement === lastFocusItem) {
        firstFocusItem.focus();
        e.preventDefault();
      }
    }
  });
}
