// Mettre le code JavaScript lié à la page photographer.html
const modal = document.querySelector('.modal-gallery');
const galleryMedia = document.querySelector('.modal-gallery__media');
const closeBtn = document.querySelector('.close-btn');
const leftChevron = document.querySelector('.fa-chevron-left');
const rightChevron = document.querySelector('.fa-chevron-right');
const modalMediaData = [];
let currentIndex;

// gestion du sort
// gestion des likes
// gestion de la modal de contact

// gestion des médias
async function getProfileContent (id, photographers, medias) {
  document.querySelector('header').querySelector('h1').innerHTML = '';

  // Clear photographer section for SPA navigation
  const photographersSection = document.querySelector('.photographer_section');
  photographersSection.innerHTML = '';
  photographersSection.style.display = 'block';

  // Get and display photographer contact section
  const photographer = photographers.find(
    (photographer) => photographer.id === parseInt(id)
  );
  const photographerModel = photographerFactory(photographer);
  const profileDom = photographerModel.getContactSectionDOM();
  photographersSection.appendChild(profileDom);

  // Create section for photographer medias
  const mediaList = document.createElement('section');
  mediaList.setAttribute('id', 'media-section');

  // Get and display photographer medias
  const photographerMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
  );

  photographerMedias.forEach((media, idx) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    modalMediaData.push(media);
    mediaList.appendChild(mediaCardDOM);

    mediaCardDOM.firstChild.addEventListener('click', () => showModal(idx));
  });

  photographersSection.appendChild(mediaList);

  const likeButtons = document.querySelectorAll('.heart-outlined');
  likeButtons.forEach((button, index) => {
    button.addEventListener('click', () => handleLikeButton(index));
  });

  showLikesAndDailyFeeTag(photographer);
}

function handleLikeButton (index) {
  console.log('Clicked');
  const totalLikes = document.getElementById('likes-and-fee-tag__likes');
  const likes = document.querySelectorAll('.user-media__likes');
  likes[index].setAttribute('data-isLiked', true);
  let likesValue = parseInt(likes[index].textContent);
  likesValue += 1;
  likes[index].innerText = likesValue;
  const totalLikesValue = parseInt(totalLikes.textContent);
  totalLikes.innerText = totalLikesValue + 1;
}

closeBtn.addEventListener('click', () => hideModal());

rightChevron.addEventListener('click', () => {
  currentIndex >= modalMediaData.length - 1 ? (currentIndex = 0) : currentIndex++;
  replaceModalContent();
});

leftChevron.addEventListener('click', (e) => {
  prevMedia();
});

/// /// /// /// /// /// /// ///
/// /// Helper functions /// ///
/// /// /// /// /// /// /// ///

/// /// Keyboard /// ///
function onArrowsKeydown (e) {
  e = e || window.event;
  switch (e.key) {
    case 'ArrowLeft': prevMedia();
      break;
    case 'ArrowRight': nextMedia();
      break;
    case 'Escape' : hideModal();
  }
}

/// /// Modal /// ///
function showModal (index) {
  currentIndex = index;
  modalMediaModel = mediaFactory(modalMediaData[currentIndex]);
  modalMediaDOM = modalMediaModel.getModalMediaDOM();

  galleryMedia.appendChild(modalMediaDOM);
  modal.style.display = 'block';

  document.onkeydown = onArrowsKeydown;
}

function hideModal () {
  modal.style.display = 'none';
  galleryMedia.innerHTML = '';
}

function replaceModalContent () {
  modalMediaDOM = mediaFactory(modalMediaData[currentIndex]).getModalMediaDOM();
  galleryMedia.firstChild.replaceWith(modalMediaDOM);
}

function prevMedia () {
  currentIndex <= 0 ? (currentIndex = modalMediaData.length - 1) : currentIndex--;
  replaceModalContent();
}

function nextMedia () {
  currentIndex >= modalMediaData.length - 1 ? (currentIndex = 0) : currentIndex++;
  replaceModalContent();
}

/// /// UI /// ///
function showLikesAndDailyFeeTag (photographer) {
  let likes = 0;
  const articlesLikes = document.querySelectorAll('.user-media__likes');

  articlesLikes.forEach(article => {
    likes += parseInt(article.textContent);
  });

  // modalMediaData.forEach(media => {
  //   likes += media.likes;
  // });

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
