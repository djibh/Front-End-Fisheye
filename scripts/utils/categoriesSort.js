// eslint-disable-next-line no-unused-vars
function _buildSortOptions () {
  const optionsLabel = ['Popularité', 'Date', 'Titre'];
  const optionsName = ['likes', 'date', 'title'];

  const mediaSection = document.getElementById('media-section');
  const dropdownSortContainer = document.createElement('div');
  dropdownSortContainer.setAttribute('id', 'sort-container');
  const sortTitle = document.createElement('h3');
  sortTitle.innerText = 'Trier par';

  const optionsList = document.createElement('ul');
  optionsList.setAttribute('id', 'options-list');
  optionsList.setAttribute('tabindex', '0');
  optionsList.setAttribute('aria-label', 'Liste des options de tri');
  optionsList.setAttribute('role', 'listbox');

  optionsLabel.forEach((label, idx) => {
    const optionLabel = document.createElement('li');
    const optionLabelLink = document.createElement('a');
    optionLabelLink.setAttribute('href', '#');
    optionLabelLink.setAttribute('aria-label', optionsName[idx]);
    optionLabel.classList.add('option');
    optionLabel.setAttribute('name', optionsName[idx]);
    optionLabelLink.setAttribute('aria-selected', 'false');
    optionLabelLink.setAttribute('aria-label', optionsLabel[idx]);
    optionLabelLink.setAttribute('role', 'option');
    optionLabelLink.innerText = label;
    optionLabel.appendChild(optionLabelLink);

    // idx !== 0 || optionLabel.classList.add('active');
    if (idx === 0) {
      optionLabel.classList.add('active');
      optionLabelLink.setAttribute('aria-selected', 'true');
    }

    optionsList.appendChild(optionLabel);
  });

  dropdownSortContainer.appendChild(sortTitle);
  dropdownSortContainer.appendChild(optionsList);
  mediaSection.insertBefore(dropdownSortContainer, mediaSection.firstChild);
}

// eslint-disable-next-line no-unused-vars
function _handleSortClick (prop) {
  photographerMedias.sort(function (a, b) {
    if (a[prop] < b[prop]) { return -1; } else { return 1; }
  });
}
