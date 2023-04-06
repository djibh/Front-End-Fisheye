// Factory pattern: here we use data to build photographers grid for the landing page
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { id, name, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  // build DOM elements for photographer cards
  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = createArticleLink();
    const description = createArticleDescription();

    article.appendChild(link);
    article.appendChild(description);
    return article;
  }

  // build DOM elements for photographer contact section
  function getContactSectionDOM() {
    const section = document.createElement('section');
    section.classList.add('contact-section');
    const nameDiv = createNameDiv();
    const contactDiv = createContactDiv();
    const photoDiv = createPhotoDiv();

    section.appendChild(nameDiv);
    section.appendChild(contactDiv);
    section.appendChild(photoDiv);
    return section;
  }

  // build and return link DOM for photographer cards
  function createArticleLink() {
    const link = document.createElement('a');
    link.setAttribute('href', 'javascript:void(0)');
    link.setAttribute('id', id);
    link.classList.add('photograph-link');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    link.appendChild(img);
    link.appendChild(h2);

    return link;
  }

  // build and return description DOM elements for photographer cards
  function createArticleDescription() {
    const description = document.createElement('div');
    description.classList.add('description');
    const location = document.createElement('h3');
    location.textContent = `${city}, ${country}`;
    const tagLine = document.createElement('h4');
    tagLine.textContent = tagline;
    const priceTag = document.createElement('h5');
    priceTag.textContent = `${price}€/jour`;
    description.appendChild(location);
    description.appendChild(tagLine);
    description.appendChild(priceTag);

    return description;
  }

  // build and return text info DOM elements for contact section
  function createNameDiv() {
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('photograph-info');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const h4 = document.createElement('h4');
    h4.textContent = tagline;
    nameDiv.appendChild(h2);
    nameDiv.appendChild(h3);
    nameDiv.appendChild(h4);

    return nameDiv;
  }

  // build and return DOM elements for contact button
  function createContactDiv() {
    const contactDiv = document.createElement('div');
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('title', 'Bouton de contact');
    button.setAttribute('aria-label', 'Bouton d\'ouverture du formulaire de contact');
    button.setAttribute('aria-haspopup', 'dialog');
    button.classList.add('contact-button');
    button.innerText = 'Contactez-moi';
    contactDiv.appendChild(button);

    return contactDiv;
  }

  // build and return the profile photo DOM elements for contact section
  function createPhotoDiv() {
    const photoDiv = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    photoDiv.appendChild(img);

    return photoDiv;
  }

  return { name, picture, getUserCardDOM, getContactSectionDOM };
}
