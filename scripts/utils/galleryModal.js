const modal = document.querySelector('.modal-gallery');
const galleryMedia = document.querySelector('.modal-gallery__media');

let currentIndex;

/// /// Modal /// ///
// open modal for media gallery
// eslint-disable-next-line no-unused-vars
function showModal(index) {
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.setAttribute('aria-label', 'Fermeture du média');
  const leftChevron = document.querySelector('.fa-chevron-left');
  leftChevron.setAttribute('aria-label', 'Média précédent');
  const rightChevron = document.querySelector('.fa-chevron-right');
  rightChevron.setAttribute('aria-label', 'Média suivant');

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
  rightChevron.addEventListener('click', _nextMedia);
  leftChevron.addEventListener('click', _prevMedia);

  trapFocusGalleryModal();
}

// hide media gallery modal
function hideModal() {
  modal.style.display = 'none';
  galleryMedia.innerHTML = '';
  modal.setAttribute('aria-hidden', 'true');
  mainDocument.setAttribute('aria-hidden', 'false');
}

// show previous media in gallery modal
function _prevMedia() {
  currentIndex <= 0
    ? (currentIndex = photographerMedias.length - 1)
    : currentIndex--;
  _replaceModalContent();
}

// show next media in gallery modal
function _nextMedia() {
  currentIndex >= photographerMedias.length - 1
    ? (currentIndex = 0)
    : currentIndex++;
  _replaceModalContent();
}

// refresh media content when fetching previous/next media
function _replaceModalContent() {
  modalMediaDOM = mediaFactory(photographerMedias[currentIndex]).getModalMediaDOM();
  galleryMedia.firstChild.replaceWith(modalMediaDOM);
}

// used to keep focus in gallery modal while tabbing
function trapFocusGalleryModal() {
  const focusItems = contactModal.querySelectorAll('button:not([disabled]), img, video');
  const firstFocusItem = focusItems[0];
  const lastFocusItem = focusItems[focusItems.length - 1];

  modal.addEventListener('keydown', function(e) {
    const isTabPressed = (e.key === 'Tab');
    const isEscapePressed = (e.key === 'Escape');
    const isRightArrowPressed = (e.key === 'ArrowRight');
    const isLeftArrowPressed = (e.key === 'ArrowLeft');

    if (!isTabPressed) {
      if (isEscapePressed) { hideModal(); }
      if (isRightArrowPressed) { _nextMedia(); }
      if (isLeftArrowPressed) { _prevMedia(); }
      return;
    }

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
