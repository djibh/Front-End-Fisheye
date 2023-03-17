function photographerFactory(data) {
  const { name, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = createArticleLink();
    const description = createArticleDescription();

    article.appendChild(link);
    article.appendChild(description);
    return article;
  }

  function createArticleLink() {
    const link = document.createElement("a");
    link.setAttribute("href", "/");
    link.setAttribute("alt", name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    link.appendChild(img);
    link.appendChild(h2);

    return link;
  }

  function createArticleDescription() {
    const description = document.createElement("div");
    description.classList.add("description");
    const location = document.createElement("h3");
    location.textContent = `${city}, ${country}`;
    const tagLine = document.createElement("h4");
    tagLine.textContent = tagline;
    const priceTag = document.createElement("h5");
    priceTag.textContent = `${price}€/jour`;
    description.appendChild(location);
    description.appendChild(tagLine);
    description.appendChild(priceTag);

    return description;
  }

  return { name, picture, getUserCardDOM };
}
