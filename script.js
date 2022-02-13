const cardsSection = document.querySelector('.items');

function createCustomElement(type, className = '', text = '') {
  const element = document.createElement(type);
  element.className = className;
  element.innerHTML = text;
  return element;
}

function createCustomImage(url, className = '') {
  const image = document.createElement('img');
  image.src = url;
  image.className = className;
  return image
}

function addDetailsToItem(element, value) {
  const text = `<b>${element[0].toUpperCase()}${element.slice(1)}: </b>${value}`;
  const classe = `${element[0]} abstract-info`;
  const div = createCustomElement('div', classe, text);
  div.addEventListener('click', handleItemCardClick);
  return div;
}

function createItemSection(dataObj) {
  const detail = getItemDetailList(dataObj);
  const container = createCustomElement('section', 'item-cards');
  const image = createCustomImage(detail.img,'image');
  image.addEventListener('click', handleItemCardClick);
  container.appendChild(image);
  container.appendChild(createCustomElement('div', 'title', detail.title));
  //Details
  const detailContainer = container.appendChild(createCustomElement('section', 'abstract'));
  const keys = Object.keys(detail);
  keys.forEach((element) => {
    if (element !== 'title' && element !== 'img') {
      detailContainer.appendChild(addDetailsToItem(element, detail[element]));
    }
  });
  return container
}

function getItemDetailList(item) {
  const detail = {
    title: item.title[0].substring(0, 40),
    country: item.country[0],
    institution: (item.dataProvider !== undefined) ? item.dataProvider[0] : '',
    description: (item.dcDescription !== undefined) ? item.dcDescription[0].substring(0, 80) : '',
    creator: (item.dcCreator !== undefined) ? item.dcCreator[0] : '',
    img: item.edmPreview[0],
  };
  return detail;
}

async function loadArts () {
  const query = document.querySelector('#art-search');
  if (query.value) {
    cardsSection.innerHTML = '';
    const data = await fetchItem(query.value);
    // trocar por texto na pagina // Ray
    if (data.length === 0) alert("Nenhum ítem encontrado");
    data.forEach((item) => {
      cardsSection.appendChild(createItemSection(item));
    });
  }
  query.value = '';
}

// HELPERS
const getElementOrClosest = (sectionClass, target) => 
  target.classList.contains(sectionClass)
    ? target
    : target.closest(sectionClass);


// HANDLERS

const handleItemCardClick = ({ target }) => {
  const section = getElementOrClosest('.item-cards', target);
  cardsSection.innerHTML = '';
  cardsSection.appendChild(section);
};

window.onload = () => {
  const button = document.querySelector('#btn-finder');
  button.addEventListener('click', loadArts);
  const input = document.querySelector('#art-search');
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') loadArts();
  });
}