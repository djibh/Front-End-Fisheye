
// Create section for photographer medias
const mediaList = document.createElement('section');
mediaList.setAttribute('id', 'media-section');
// Create section for gallery modal
const modal = document.querySelector('.modal-gallery');
const galleryMedia = document.querySelector('.modal-gallery__media');
const closeBtn = document.querySelector('.close-btn');
const leftChevron = document.querySelector('.fa-chevron-left');
const rightChevron = document.querySelector('.fa-chevron-right');
const photographersSection = document.querySelector('.photographer_section');
let photographer;
let photographerMedias = [];
let currentIndex;

// gestion du sort
// gestion des likes
// gestion de la modal de contact

// gestion des médias
async function getProfileContent (id, photographers, medias) {
  document.querySelector('header').querySelector('h1').innerHTML = '';

  _getPhotographer(id, photographers);
  _getPhotographerMedias(photographer.id, medias);

  _buildContactSection(id, photographers);
  _buildMediasGallery(id, medias);
  console.log('====================================');
  console.log(photographerMedias);
  console.log('====================================');
  _buildSortOptions(medias);
  _buildLikesAndDailyFeeTag(photographer);

  const optionsDOM = document.querySelectorAll('.option');
  optionsDOM.forEach(option => option.addEventListener('click', () => {
    optionsDOM.forEach(option => {
      option.classList.toggle('visible');
    });

    option.classList.toggle('active');
    if (option.classList.contains('active')) {
      _handleSortClick(option.getAttribute('name'));
      document.querySelectorAll('.media-card').forEach(article => article.remove());

      _buildMediasGallery(id, photographerMedias);
    }
  }));
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

function _getPhotographerMedias (id, medias) {
  photographerMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
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

function _buildMediasGallery () {
  // Isolate and display photographer medias

  photographerMedias.forEach((media, idx) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();

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
  const optionsName = ['likes', 'date', 'title'];

  const mediaSection = document.getElementById('media-section');
  const dropdownSortContainer = document.createElement('div');
  dropdownSortContainer.setAttribute('id', 'sort-container');
  const sortTitle = document.createElement('h3');
  sortTitle.innerText = 'Trier par';

  const optionsList = document.createElement('ul');
  optionsList.setAttribute('id', 'options-list');

  optionsLabel.forEach((label, idx) => {
    const optionLabel = document.createElement('li');
    optionLabel.classList.add('option');
    optionLabel.setAttribute('name', optionsName[idx]);
    optionLabel.innerText = label;

    idx !== 0 || optionLabel.classList.add('active');

    optionsList.appendChild(optionLabel);
  });

  dropdownSortContainer.appendChild(sortTitle);
  dropdownSortContainer.appendChild(optionsList);
  mediaSection.appendChild(dropdownSortContainer);
}

function _handleSortClick (prop) {
  photographerMedias.sort(function (a, b) {
    if (a[prop] < b[prop]) { return -1; } else { return 1; }
  });
}

/// /// Modal /// ///
function _showModal (index) {
  currentIndex = index;
  modalMediaModel = mediaFactory(photographerMedias[currentIndex]);
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
  modalMediaDOM = mediaFactory(photographerMedias[currentIndex]).getModalMediaDOM();
  galleryMedia.firstChild.replaceWith(modalMediaDOM);
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

/// /// UI /// ///
function _buildLikesAndDailyFeeTag (photographer) {
  let likes = 0;

  photographerMedias.forEach((media) => {
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
