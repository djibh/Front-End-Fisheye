// Mettre le code JavaScript lié à la page photographer.html
const modal = document.querySelector('.modal-gallery');
const galleryMedia = document.querySelector('.modal-gallery__media');
const closeBtn = document.querySelector('.close-btn');
const leftChevron = document.querySelector('.fa-chevron-left');
const rightChevron = document.querySelector('.fa-chevron-right');
const photographersSection = document.querySelector('.photographer_section');
const modalMediaData = [];
let photographer;
let currentIndex;

// gestion du sort
// gestion des likes
// gestion de la modal de contact

// gestion des médias
async function getProfileContent (id, photographers, medias) {
  document.querySelector('header').querySelector('h1').innerHTML = '';

  _getPhotographer(id, photographers);
  _buildContactSection(id, photographers);
  _buildMediasGallery(id, medias);
  _buildSortOptions();
  _buildLikesAndDailyFeeTag(photographer);
}

/// /// /// /// /// /// /// ///
/// /// Helper functions /// ///
/// /// /// /// /// /// /// ///

/// /// Keyboard /// ///
function _onArrowsKeydown (e) {
  e = e || window.event;
  switch (e.key) {
    case 'ArrowLeft':
      _prevMedia();
      break;
    case 'ArrowRight':
      _nextMedia();
      break;
    case 'Escape':
      _hideModal();
      break;
  }
}

/// /// General /// ///
function _getPhotographer (id, photographers) {
  photographer = photographers.find(
    (photographer) => photographer.id === parseInt(id)
  );
}

function _buildContactSection (id, photographers) {
  // Clear photographer section for SPA navigation
  photographersSection.innerHTML = '';
  photographersSection.style.display = 'block';

  // Display photographer contact section
  const photographerModel = photographerFactory(photographer);
  const profileDom = photographerModel.getContactSectionDOM();
  photographersSection.appendChild(profileDom);
}

function _buildMediasGallery (id, medias) {
  // Create section for photographer medias
  const mediaList = document.createElement('section');
  mediaList.setAttribute('id', 'media-section');

  // Isolate and display photographer medias
  const photographerMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
  );

  photographerMedias.forEach((media, idx) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    modalMediaData.push(media);
    mediaList.appendChild(mediaCardDOM);

    mediaCardDOM.firstChild.addEventListener('click', () => _showModal(idx));
  });
  photographersSection.appendChild(mediaList);

  const likeButtons = document.querySelectorAll('.heart-outlined');
  likeButtons.forEach((button, index) => {
    button.addEventListener('click', () => _handleLikeButton(index));
  });
}

function _buildSortOptions () {
  const optionsLabel = ['Popularité', 'Date', 'Titre'];

  const mediaSection = document.getElementById('media-section');
  const dropdownSortContainer = document.createElement('div');
  dropdownSortContainer.setAttribute('id', 'sort-container');
  const sortTitle = document.createElement('h3');
  sortTitle.innerText = 'Trier';

  const optionsList = document.createElement('ul');
  optionsList.setAttribute('id', 'options-list');

  optionsLabel.forEach((label, idx) => {
    const optionLabel = document.createElement('li');
    optionLabel.classList.add('option');
    optionLabel.innerText = label;

    idx !== 0 || optionLabel.classList.add('active');

    optionsList.appendChild(optionLabel);
  });

  dropdownSortContainer.appendChild(sortTitle);
  dropdownSortContainer.appendChild(optionsList);
  mediaSection.appendChild(dropdownSortContainer);

  const optionsDOM = document.querySelectorAll('.option');
  optionsDOM.forEach(option => option.addEventListener('click', () => {
    optionsDOM.forEach(option => {
      option.classList.toggle('visible');
    });

    option.classList.toggle('active');
  }));
}

function _handleSortClick () {}

/// /// Modal /// ///
function _showModal (index) {
  currentIndex = index;
  modalMediaModel = mediaFactory(modalMediaData[currentIndex]);
  modalMediaDOM = modalMediaModel.getModalMediaDOM();

  galleryMedia.appendChild(modalMediaDOM);
  modal.style.display = 'block';

  document.onkeydown = _onArrowsKeydown;

  closeBtn.addEventListener('click', _hideModal);
  rightChevron.addEventListener('click', _nextMedia);
  leftChevron.addEventListener('click', _prevMedia);
}

function _hideModal () {
  modal.style.display = 'none';
  galleryMedia.innerHTML = '';
}

function _replaceModalContent () {
  modalMediaDOM = mediaFactory(modalMediaData[currentIndex]).getModalMediaDOM();
  galleryMedia.firstChild.replaceWith(modalMediaDOM);
}

function _prevMedia () {
  currentIndex <= 0
    ? (currentIndex = modalMediaData.length - 1)
    : currentIndex--;
  _replaceModalContent();
}

function _nextMedia () {
  currentIndex >= modalMediaData.length - 1
    ? (currentIndex = 0)
    : currentIndex++;
  _replaceModalContent();
}

/// /// UI /// ///
function _buildLikesAndDailyFeeTag (photographer) {
  let likes = 0;

  modalMediaData.forEach((media) => {
    likes += media.likes;
  });

  const tagDiv = document.createElement('div');
  tagDiv.setAttribute('id', 'likes-and-fee-tag');
  const likesCount = document.createElement('h4');
  likesCount.setAttribute('id', 'likes-and-fee-tag__likes');
  likesCount.innerText = likes;
  tagDiv.appendChild(likesCount);

  const dailyFee = document.createElement('h4');
  dailyFee.innerText = `${photographer.price}€/jour`;
  tagDiv.appendChild(dailyFee);

  document.body.appendChild(tagDiv);
}

function _handleLikeButton (index) {
  const totalLikes = document.getElementById('likes-and-fee-tag__likes');
  const likes = document.querySelectorAll('.user-media__likes');
  const likeIcons = document.querySelectorAll('.heart-outlined');
  const likesValue = parseInt(likes[index].textContent);
  const totalLikesValue = parseInt(totalLikes.textContent);
  const isLiked = likeIcons[index].getAttribute('data-isLiked');

  if (isLiked === 'false') {
    likeIcons[index].setAttribute('data-isLiked', true);
    likes[index].innerText = likesValue + 1;
    totalLikes.innerText = totalLikesValue + 1;
  }

  if (isLiked === 'true') {
    likeIcons[index].setAttribute('data-isLiked', false);
    likes[index].innerText = likesValue - 1;
    totalLikes.innerText = totalLikesValue - 1;
  }
}
