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
  document.querySelector('.media-container').focus();

  document.onkeydown = onArrowsKeydown;

  closeBtn.addEventListener('click', hideModal);
  closeBtn.setAttribute('aria-label', 'Fermeture du média');
  rightChevron.addEventListener('click', _nextMedia);
  rightChevron.setAttribute('aria-label', 'Média suivant');
  leftChevron.addEventListener('click', _prevMedia);
  leftChevron.setAttribute('aria-label', 'Média précédent');

  trapFocusGalleryModal();
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

function trapFocusGalleryModal () {
  const focusItems = contactModal.querySelectorAll('button:not([disabled]), img, video');
  console.log(focusItems);
  const firstFocusItem = focusItems[0];
  const lastFocusItem = focusItems[focusItems.length - 1];

  modal.addEventListener('keydown', function (e) {
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
