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
  optionsList.setAttribute('role', 'list');

  optionsLabel.forEach((label, idx) => {
    const optionLabel = document.createElement('li');
    optionLabelLink = document.createElement('a');
    optionLabelLink.setAttribute('href', '#');
    optionLabelLink.setAttribute('aria-label', optionsName[idx]);
    optionLabel.classList.add('option');
    optionLabel.setAttribute('name', optionsName[idx]);
    optionLabelLink.setAttribute('aria-selected', 'false');
    optionLabelLink.setAttribute('aria-label', optionsLabel[idx]);
    optionLabelLink.innerText = label;
    optionLabel.appendChild(optionLabelLink);

    idx !== 0 || optionLabel.classList.add('active');

    optionsList.appendChild(optionLabel);
  });

  dropdownSortContainer.appendChild(sortTitle);
  dropdownSortContainer.appendChild(optionsList);
  mediaSection.insertBefore(dropdownSortContainer, mediaSection.firstChild);
}

function _handleSortClick (prop) {
  photographerMedias.sort(function (a, b) {
    if (a[prop] < b[prop]) { return -1; } else { return 1; }
  });
}
