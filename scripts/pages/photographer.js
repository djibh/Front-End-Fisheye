// Create section for photographer medias
const mediaList = document.createElement('section');
mediaList.setAttribute('id', 'media-section');

// Global variables
const photographersSection = document.querySelector('.photographer_section');
let photographer;
let photographerMedias = [];

// build all DOM sections required for a photographer page
// eslint-disable-next-line no-unused-vars
async function getProfileContent(id, photographers, medias) {
  // Remove 'Nos Photographes' title
  document.querySelector('header').querySelector('h1').innerHTML = '';

  // get info for DOM building
  getPhotographer(id, photographers);
  getPhotographerMedias(photographer.id, medias);

  // build DOM
  buildContactSection();
  buildContactForm();
  handleSort('likes');
  buildMediasGallery();
  buildSortOptions();
  buildLikesAndDailyFeeTag();
}

/// /// General /// ///
// Isolate one photographer using the ID
function getPhotographer(id, photographers) {
  photographer = photographers.find(
    (photographer) => photographer.id === parseInt(id)
  );
}

// get medias for one photographer using the ID
function getPhotographerMedias(id, medias) {
  photographerMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
  );
}

/// /// UI /// ///
// build DOM banner for contact section
function buildContactSection() {
  // Clear photographer section for SPA navigation
  photographersSection.innerHTML = '';
  photographersSection.style.display = 'block';

  // Display photographer contact section
  const photographerModel = photographerFactory(photographer);
  const profileDom = photographerModel.getContactSectionDOM();
  photographersSection.appendChild(profileDom);

  document.querySelector('.contact-button').addEventListener('click', displayModal);
}

// build DOM form contact form
function buildContactForm() {
  const contactModal = document.getElementById('contact-modal');
  contactModal.setAttribute('role', 'dialog');
  const contactName = document.getElementById('contact-modal__photographer-name');
  contactName.innerText = photographer.name;
  const form = document.createElement('form');
  form.setAttribute('id', 'contact-form');
  form.setAttribute('method', '');
  form.setAttribute('action', 'index.html');
  form.setAttribute('name', 'signup');
  form.innerHTML =
  '<label for="contact-lastName">Prénom</label>' +
      '<input type="text" name="contact-lastName" id="contact-lastName" aria-labelledBy autofocus />' +
      '<label for="contact-firstName">Nom</label>' +
      '<input type="text" name="contact-firstName" id="contact-firstName">' +
      '<label for="contact-email">Email</label>' +
      '<input type="email" name="contact-email" id="contact-email">' +
      '<label for="contact-message">Votre message</label>' +
      '<textarea type="text" name="contact-message" id="contact-message"></textarea>' +
      '<button id="contact-submit-btn" type="submit">Envoyer</button>';

  contactModal.appendChild(form);
}

// build DOM grid to display medias fetched from json, using a factory
function buildMediasGallery() {
  photographerMedias.forEach((media, idx) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();

    mediaList.appendChild(mediaCardDOM);

    mediaCardDOM.firstChild.addEventListener('click', () => showModal(idx));
  });
  photographersSection.appendChild(mediaList);

  const likeButtons = document.querySelectorAll('.heart-outlined');
  likeButtons.forEach((button, index) => {
    button.addEventListener('click', () => handleLikeButton(index));
  });
}

// build DOM elements for bottom tag showing total likes and daily fee
function buildLikesAndDailyFeeTag() {
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

/// /// /// /// /// /// /// ///
/// /// Helper functions /// ///
/// /// /// /// /// /// /// ///

/// /// Keyboard /// ///
// key binding management
// eslint-disable-next-line no-unused-vars
function onArrowsKeydown(e) {
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

// change the heart icon for like feature and update counts
function handleLikeButton(index) {
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
