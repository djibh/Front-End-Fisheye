function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes } = data;

  const mediaPath = `assets/images/`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    let thumbnail = document.createElement("img");
    let description = document.createElement("div");
    description.classList.add('user-media__description')
    let mediaTitle = document.createElement("h4");
    mediaTitle.innerText = title;
    let likeCount = document.createElement("h4");
    likeCount.innerText = likes;
    description.appendChild(mediaTitle);
    description.appendChild(likeCount);

    thumbnail.classList.add("user-media");
    image
      ? thumbnail.setAttribute("src", mediaPath + image)
      : thumbnail.setAttribute("src", mediaPath + video);

    article.appendChild(thumbnail);
    article.appendChild(description);
    return article;
  }
  return { getMediaCardDOM };
}

// class MediaFactory {
//     constructor(data, type) {
//       switch (type) {
//         case "image":
//           return new ImageCard();
//         case "media":
//           return new MediaCard();
//       }
//     }
//   }
