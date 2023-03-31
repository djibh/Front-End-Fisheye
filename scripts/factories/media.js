// eslint-disable-next-line no-unused-vars
function mediaFactory (data) {
  const { photographerId, title, image, video, likes } = data;

  const mediaPath = `assets/images/${photographerId}/`;

  function getMediaCardDOM () {
    const article = document.createElement('article');
    article.classList.add('media-card');
    const link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('aria-label', title);
    const description = document.createElement('div');
    description.classList.add('user-media__description');
    const mediaTitle = document.createElement('h4');
    mediaTitle.classList.add('user-media__title');
    mediaTitle.innerText = title;
    const likeCount = document.createElement('h4');
    likeCount.classList.add('user-media__likes');
    likeCount.setAttribute('data-isLiked', false);
    likeCount.innerText = likes;
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-regular');
    heartIcon.classList.add('fa-heart');
    heartIcon.classList.add('heart-outlined');
    heartIcon.setAttribute('data-isLiked', false);

    description.appendChild(mediaTitle);
    description.appendChild(likeCount);
    description.appendChild(heartIcon);

    if (image) {
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('user-media');
      thumbnail.setAttribute('src', mediaPath + image);
      thumbnail.setAttribute('alt', title);
      thumbnail.style.objectFit = 'cover';
      thumbnail.style.width = '350px';
      thumbnail.style.height = '300px';
      link.appendChild(thumbnail);
      article.appendChild(link);
    } else {
      const userVideo = document.createElement('video');
      userVideo.setAttribute('src', mediaPath + video);
      userVideo.setAttribute('type', 'video/mp4');
      userVideo.setAttribute('alt', title);
      userVideo.style.objectFit = 'cover';
      userVideo.style.width = '350px';
      userVideo.style.height = '300px';

      article.appendChild(userVideo);
    }

    article.appendChild(description);
    return article;
  }

  function getModalMediaDOM () {
    const article = document.createElement('article');
    const mediaTitle = document.createElement('h4');
    mediaTitle.innerText = title;
    mediaTitle.style.fontSize = '1.2rem';

    if (image) {
      const modalImage = document.createElement('img');
      modalImage.setAttribute('src', mediaPath + image);
      modalImage.setAttribute('alt', title);

      article.appendChild(modalImage);
      article.appendChild(mediaTitle);
      return article;
    } else {
      const modalVideo = document.createElement('video');
      modalVideo.setAttribute('src', mediaPath + video);
      modalVideo.setAttribute('type', 'video/mp4');
      modalVideo.setAttribute('alt', title);
      modalVideo.setAttribute('controls', '');
      modalVideo.style.width = '100%';

      article.appendChild(modalVideo);
      article.appendChild(mediaTitle);
      return article;
    }
  }

  return { getMediaCardDOM, getModalMediaDOM };
}
