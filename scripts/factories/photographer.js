function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const description = document.createElement('div');
        description.classList.add("description");
        const location = document.createElement('h3')
        location.textContent = `${city}, ${country}`
        const tagLine = document.createElement('h4');
        tagLine.textContent = tagline;
        const priceTag = document.createElement('h5');
        priceTag.textContent = `${price}€/jour`;
        description.appendChild(location);
        description.appendChild(tagLine);
        description.appendChild(priceTag);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(description);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}