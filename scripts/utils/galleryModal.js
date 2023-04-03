const modal = document.querySelector('.modal-gallery');
const galleryMedia = document.querySelector('.modal-gallery__media');
const closeBtn = document.querySelector('.close-btn');
const leftChevron = document.querySelector('.fa-chevron-left');
const rightChevron = document.querySelector('.fa-chevron-right');
let currentIndex;

/// /// Modal /// ///
function showModal (index) {
  currentIndex = index;
  modalMediaModel = mediaFactory(photographerMedias[currentIndex]);
  modalMediaDOM = modalMediaModel.getModalMediaDOM();

  galleryMedia.appendChild(modalMediaDOM);
  modal.style.display = 'block';
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'false');
  mainDocument.setAttribute('aria-hidden', 'true');

  document.onkeydown = onArrowsKeydown;

  closeBtn.addEventListener('click', hideModal);
  closeBtn.setAttribute('aria-label', 'Fermeture du média');
  rightChevron.addEventListener('click', _nextMedia);
  rightChevron.setAttribute('aria-label', 'Média suivant');
  leftChevron.addEventListener('click', _prevMedia);
  leftChevron.setAttribute('aria-label', 'Média précédent');
}

function hideModal () {
  modal.style.display = 'none';
  galleryMedia.innerHTML = '';
  modal.setAttribute('aria-hidden', 'true');
  mainDocument.setAttribute('aria-hidden', 'false');
}

function _prevMedia () {
  currentIndex <= 0
    ? (currentIndex = photographerMedias.length - 1)
    : currentIndex--;
  _replaceModalContent();
}

function _nextMedia () {
  currentIndex >= photographerMedias.length - 1
    ? (currentIndex = 0)
    : currentIndex++;
  _replaceModalContent();
}

function _replaceModalContent () {
  modalMediaDOM = mediaFactory(photographerMedias[currentIndex]).getModalMediaDOM();
  galleryMedia.firstChild.replaceWith(modalMediaDOM);
}
