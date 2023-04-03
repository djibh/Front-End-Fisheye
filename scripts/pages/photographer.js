// Create section for photographer medias
const mediaList = document.createElement('section');
mediaList.setAttribute('id', 'media-section');
// Create section for gallery modal

const photographersSection = document.querySelector('.photographer_section');
let photographer;
let photographerMedias = [];

// gestion des médias
async function getProfileContent (id, photographers, medias) {
  document.querySelector('header').querySelector('h1').innerHTML = '';

  _getPhotographer(id, photographers);
  _getPhotographerMedias(photographer.id, medias);

  _buildContactSection(id, photographers);
  _buildContactForm();
  _buildMediasGallery(id, medias);
  _buildSortOptions(medias);
  _buildLikesAndDailyFeeTag(photographer);

  const optionsDOM = document.querySelectorAll('.option');
  optionsDOM.forEach(option => option.addEventListener('click', (e) => {
    e.preventDefault();
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
function onArrowsKeydown (e) {
  e = e || window.event;
  switch (e.key) {
    case 'ArrowLeft':
      _prevMedia();
      break;
    case 'ArrowRight':
      _nextMedia();
      break;
    case 'Escape':
      if (modal.style.display === 'block') { hideModal(); }
      if (contactModal.style.display === 'block') { closeContactModal(); }

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

  document.querySelector('.contact-button').addEventListener('click', displayModal);
}

function _buildMediasGallery () {
  // Isolate and display photographer medias

  photographerMedias.forEach((media, idx) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();

    mediaList.appendChild(mediaCardDOM);

    mediaCardDOM.firstChild.addEventListener('click', () => showModal(idx));
  });
  photographersSection.appendChild(mediaList);

  const likeButtons = document.querySelectorAll('.heart-outlined');
  likeButtons.forEach((button, index) => {
    button.addEventListener('click', () => _handleLikeButton(index));
  });
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

function _buildContactForm () {
  // build dom in existing modal
  const contactModal = document.getElementById('contact-modal');
  const contactName = document.getElementById('contact-modal__photographer-name');
  contactName.innerText = photographer.name;
  const form = document.createElement('form');
  form.setAttribute('id', 'contact-form');
  form.setAttribute('method', '');
  form.setAttribute('action', 'index.html');
  form.setAttribute('name', 'signup');
  form.innerHTML = '<label for="contact-lastName">Prénom</label>' +
      '<input type="text" name="contact-lastName" id="contact-lastName" autofocus />' +
      '<label for="contact-firstName">Nom</label>' +
      '<input type="text" name="contact-firstName" id="contact-firstName">' +
      '<label for="contact-email">Email</label>' +
      '<input type="email" name="contact-email" id="contact-email">' +
      '<label for="contact-message">Votre message</label>' +
      '<textarea type="text" name="contact-message" id="contact-message"></textarea>' +
      '<button id="contact-submit-btn" type="submit">Envoyer</button>';

  contactModal.appendChild(form);
}
