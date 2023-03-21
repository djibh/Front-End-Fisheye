function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes } = data;

  const mediaPath = `assets/images/${photographerId}/`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    let thumbnail = document.createElement("img");
    thumbnail.classList.add("user-media");
    let description = document.createElement("div");
    description.classList.add("user-media__description");
    let mediaTitle = document.createElement("h4");
    mediaTitle.classList.add("user-media__title");
    mediaTitle.innerText = title;
    let likeCount = document.createElement("h4");
    let likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");
    likeCount.classList.add("user-media__likes");
    likeCount.innerText = likes;
    let heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.add("fa-heart");

    description.appendChild(mediaTitle);
    description.appendChild(likeCount);
    description.appendChild(heartIcon);
    

    thumbnail.classList.add("user-media");
    if (image) {
      thumbnail.setAttribute("src", mediaPath + image);
      thumbnail.style.objectFit = "cover";
      thumbnail.style.width = "350px";
      thumbnail.style.height = "300px";
      article.appendChild(thumbnail);
    } else {
      let userVideo = document.createElement("video");
      userVideo.setAttribute("src", mediaPath + video);
      userVideo.setAttribute("type", "video/mp4");
      userVideo.style.objectFit = "cover";
      userVideo.style.width = "400px";
      userVideo.style.height = "300px";
      userVideo.addEventListener("loadedmetadata", () => {
        canvas.width = userVideo.width;
        canvas.height = userVideo.height;
      });
      article.appendChild(userVideo);

      let canvas = document.createElement("canvas");
      let canvasCtx = canvas.getContext("2d");

      canvasCtx.drawImage(userVideo, 0, 0, userVideo.width, userVideo.height);

      article.appendChild(canvas);
    }

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
