// Create section for photographer medias
const mediaList = document.createElement('section');
mediaList.setAttribute('id', 'media-section');
// Create section for gallery modal

const photographersSection = document.querySelector('.photographer_section');
let contactForm;
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

  contactForm.addEventListener('submit', (e) => {
    e.prevenDefault();
    formValidation();
  });
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

      // hideModal();
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
  optionsList.setAttribute('role', 'list');

  optionsLabel.forEach((label, idx) => {
    const optionLabel = document.createElement('li');
    optionLabelLink = document.createElement('a');
    optionLabelLink.setAttribute('href', '#');
    optionLabelLink.setAttribute('aria-label', optionsName[idx]);
    optionLabel.classList.add('option');
    optionLabel.setAttribute('name', optionsName[idx]);
    optionLabelLink.setAttribute('aria-selected', 'false');
    optionLabelLink.setAttribute('aria-label', optionsLabel[idx]);
    optionLabelLink.innerText = label;
    optionLabel.appendChild(optionLabelLink);

    idx !== 0 || optionLabel.classList.add('active');

    optionsList.appendChild(optionLabel);
  });

  dropdownSortContainer.appendChild(sortTitle);
  dropdownSortContainer.appendChild(optionsList);
  mediaSection.insertBefore(dropdownSortContainer, mediaSection.firstChild);
}

function _handleSortClick (prop) {
  photographerMedias.sort(function (a, b) {
    if (a[prop] < b[prop]) { return -1; } else { return 1; }
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
      '<label for="contact-firstName">Name</label>' +
      '<input type="text" name="contact-firstName" id="contact-firstName">' +
      '<label for="contact-email">Email</label>' +
      '<input type="email" name="contact-email" id="contact-email">' +
      '<label for="contact-message">Votre message</label>' +
      '<textarea type="text" name="contact-message" id="contact-message"></textarea>' +
      '<button id="contact-submit-btn" type="submit">Envoyer</button>';

  contactModal.appendChild(form);

  // handle errors

  // handle data on submit

  // form fields
  // const contactFirstName = document.getElementById('contact-firstName');
  // const contactLastName = document.getElementById('contact-lastName');
  // const contactEmail = document.getElementById('contact-email');
  // const contactMessage = document.getElementById('contact-message');

  contactForm = form;

  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   console.log('====================================');
  //   console.log(`Prénom: ${contactFirstName.value}`);
  //   console.log(`Nom: ${contactLastName.value}`);
  //   console.log(`Email: ${contactEmail.value}`);
  //   console.log(`Message: ${contactMessage.value}`);
  //   console.log('====================================');
  //   console.log('Form successfully submitted!');
  // });
  return contactForm;
}

function formValidation () {
  const contactFirstName = document.getElementById('contact-firstName');
  const contactLastName = document.getElementById('contact-lastName');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');

  if (contactFirstName.value === '') {
    alert('Veuillez indiquer votre prénom.');
    return false;
  }

  if (contactLastName.value === '') {
    alert('Veuillez indiquer votre nom.');
    return false;
  }

  const regex = /\$+@\S+\.\S+/;
  if (contactEmail.value === '' || !regex.test(email.value)) {
    alert('Veuillez indiquer votre adresse mail.');
    return false;
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

  form.submit();
}
