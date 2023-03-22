// Mettre le code JavaScript lié à la page photographer.html
const galleryMedia = document.querySelector('.modal-gallery__media');
const leftChevron = document.querySelector('.fa-chevron-left');
const rightChevron = document.querySelector('.fa-chevron-right');
let sources = [];
let currentIndex;

// gestion de la modal de contact

// gestion de la modal gallery

function showModal (modal, index, mediaData) {
  currentIndex = index;
  sources = mediaData;
  modalMediaModel = mediaFactory(sources[currentIndex]);
  modalMediaDOM = modalMediaModel.getModalMediaDOM();

  galleryMedia.appendChild(modalMediaDOM);
  modal.style.display = 'block';
}

function hideModal (modal) {
  modal.style.display = 'none';
  galleryMedia.innerHTML = '';
}

rightChevron.addEventListener('click', () => {
  currentIndex >= sources.length - 1 ? (currentIndex = 0) : currentIndex++;
  replaceModalContent();
});

leftChevron.addEventListener('click', () => {
  currentIndex <= 0 ? (currentIndex = sources.length - 1) : currentIndex--;
  replaceModalContent();
});

function replaceModalContent () {
  modalMediaDOM = mediaFactory(sources[currentIndex]).getModalMediaDOM();
  galleryMedia.firstChild.replaceWith(modalMediaDOM);
}

// gestion du tri

// gestion des médias

// gestion des likes
