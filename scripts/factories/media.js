// eslint-disable-next-line no-unused-vars
function mediaFactory (data) {
  const { photographerId, title, image, video, likes } = data;

  const mediaPath = `assets/images/${photographerId}/`;

  function getMediaCardDOM () {
    const article = document.createElement('article');
    const description = document.createElement('div');
    description.classList.add('user-media__description');
    const mediaTitle = document.createElement('h4');
    mediaTitle.classList.add('user-media__title');
    mediaTitle.innerText = title;
    const likeCount = document.createElement('h4');
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');
    likeCount.classList.add('user-media__likes');
    likeCount.innerText = likes;
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-regular');
    heartIcon.classList.add('fa-heart');

    description.appendChild(mediaTitle);
    description.appendChild(likeCount);
    description.appendChild(heartIcon);

    if (image) {
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('user-media');
      thumbnail.setAttribute('src', mediaPath + image);
      thumbnail.style.objectFit = 'cover';
      thumbnail.style.width = '350px';
      thumbnail.style.height = '300px';
      article.appendChild(thumbnail);
    } else {
      const userVideo = document.createElement('video');
      userVideo.setAttribute('src', mediaPath + video);
      userVideo.setAttribute('type', 'video/mp4');
      userVideo.style.objectFit = 'cover';
      userVideo.style.width = '350px';
      userVideo.style.height = '300px';

      article.appendChild(userVideo);
    }

    article.appendChild(description);
    return article;
  }

  function getModalMediaDOM () {
    if (image) {
      const modalImage = document.createElement('img');
      modalImage.setAttribute('src', mediaPath + image);
      return modalImage;
    } else {
      const modalVideo = document.createElement('video');
      modalVideo.setAttribute('src', mediaPath + video);
      modalVideo.setAttribute('type', 'video/mp4');
      modalVideo.setAttribute('controls', '');
      modalVideo.style.width = '100%';
      return modalVideo;
    }
  }

  return { getMediaCardDOM, getModalMediaDOM };
}
