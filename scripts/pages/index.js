async function getPhotographers() {
  let requestData = await fetch("./data/photographers.json");
  let json = await requestData.json();
  let photographers = json.photographers;
  let medias = json.media;

  return {
    photographers: [...photographers],
    medias: [...medias],
  };
}

async function displayData(photographers, medias) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  let articles = document.querySelectorAll(".photograph-link");
  articles.forEach((photograph) =>
    photograph.addEventListener("click", () => {
      getProfileContent(photograph.id, photographers, medias);
    })
  );
}

async function getProfileContent(id, photographers, medias) {
  document.querySelector("header").querySelector("h1").innerHTML = "";

  // Clear photographer section for SPA navigation
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = "";
  photographersSection.style.display = "block";

  // Get and display photographer contact section
  const photographer = photographers.filter(
    (photographer) => photographer.id == parseInt(id)
  );
  const photographerModel = photographerFactory(...photographer);
  const profileDom = photographerModel.getContactSectionDOM();
  photographersSection.appendChild(profileDom);

  // Create section for photographer medias
  const mediaList = document.createElement("section");
  mediaList.setAttribute("id", "media-section");

  // Get and display photographer medias
  const photographerMedias = medias.filter(
    (media) => media.photographerId == parseInt(id)
  );
  photographerMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaList.appendChild(mediaCardDOM);
  });

  photographersSection.appendChild(mediaList);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, medias } = await getPhotographers();
  displayData(photographers, medias);
}

init();
