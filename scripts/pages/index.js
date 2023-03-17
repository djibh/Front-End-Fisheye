async function getPhotographers() {
  let requestData = await fetch("./data/photographers.json");
  let json = await requestData.json();
  let photographers = json.photographers;

  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function getProfileDOM(id, photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  const title = document.querySelector("header").querySelector("h1");
  title.innerHTML = "";

  photographersSection.innerHTML = "";
  photographersSection.style.display = "block";

  const photographer = photographers.filter(
    (photographer) => photographer.id == parseInt(id)
  );
  console.log(photographer[0]);

  const photographerModel = photographerFactory(photographer[0]);
  const profileDom = photographerModel.getContactSectionDOM();

  // photographersSection.innerHTML = `<p style='font-weight: bold;'>This is the ${photograph[0].name} profile page</p>`;
  photographersSection.appendChild(profileDom);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  let articles = document.querySelectorAll(".photograph-link");
  articles.forEach((photograph) =>
    photograph.addEventListener("click", () => {
      getProfileDOM(photograph.id, photographers);
    })
  );
}

init();
