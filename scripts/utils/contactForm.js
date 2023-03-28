const contactCloseBtn = document.querySelector('.contact-modal__close-btn');
const contactModal = document.getElementById('contact-modal');
const submitBtn = document.getElementById('contact-submit-btn');

contactCloseBtn.addEventListener('click', closeContactModal);

function displayModal () {
  contactModal.style.display = 'block';
}

function closeContactModal () {
  contactModal.style.display = 'none';
}
