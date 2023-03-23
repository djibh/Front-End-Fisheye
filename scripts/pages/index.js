
async function getPhotographers () {
  const requestData = await fetch('./data/photographers.json');
  const json = await requestData.json();
  const photographers = json.photographers;
  const medias = json.media;

  return {
    photographers: [...photographers],
    medias: [...medias]
  };
}

async function displayData (photographers, medias) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  const articles = document.querySelectorAll('.photograph-link');
  articles.forEach((photograph) =>
    photograph.addEventListener('click', () => {
      getProfileContent(photograph.id, photographers, medias);
    })
  );
}

async function init () {
  // Récupère les datas des photographes
  const { photographers, medias } = await getPhotographers();
  displayData(photographers, medias);
}

init();
