// Factory pattern: here we use data to build gallery media card DOM and media shown in modal
// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {
  const { photographerId, title, image, video, likes } = data;

  const mediaPath = `assets/images/${photographerId}/`;

  // build and return DOM elements for media gallery
  function getMediaCardDOM() {
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
    const heartIcon = document.createElement('em');
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
      link.appendChild(thumbnail);
      article.appendChild(link);
    } else {
      const videoDiv = document.createElement('div');
      videoDiv.classList.add('video-icon-container');
      const userVideo = document.createElement('video');
      userVideo.classList.add('user-media');
      userVideo.setAttribute('preload', 'metadata');
      userVideo.setAttribute('src', mediaPath + video);
      userVideo.setAttribute('type', 'video/mp4');
      userVideo.setAttribute('title', title);

      videoDiv.appendChild(userVideo);
      link.appendChild(videoDiv);
      article.appendChild(link);
    }

    article.appendChild(description);
    return article;
  }

  // build and return a single media DOM elements for media modal
  function getModalMediaDOM() {
    const article = document.createElement('article');
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('media-container');
    mediaDiv.setAttribute('tabindex', '0');
    mediaDiv.setAttribute('data-title', title);
    const mediaTitle = document.createElement('h4');
    mediaTitle.innerText = title;
    mediaTitle.style.fontSize = '1.2rem';

    if (image) {
      const modalImage = document.createElement('img');
      modalImage.setAttribute('src', mediaPath + image);
      modalImage.setAttribute('alt', title);
      mediaDiv.appendChild(modalImage);
      article.appendChild(mediaDiv);
      return article;
    } else {
      const modalVideo = document.createElement('video');
      modalVideo.setAttribute('src', mediaPath + video);
      modalVideo.setAttribute('type', 'video/mp4');
      modalVideo.setAttribute('controls', '');
      modalVideo.setAttribute('alt', title);

      mediaDiv.appendChild(modalVideo);
      article.appendChild(mediaDiv);
      return article;
    }
  }

  return { getMediaCardDOM, getModalMediaDOM };
}
