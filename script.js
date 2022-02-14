const cardsSection = document.querySelector('.items');
let cardsItems;

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

const dataTrybers = (div, imgName, imgText) => {
  const img = div.appendChild(createCustomElement('div', 'trybe-img'));
  img.appendChild(createCustomImage(imgName));
  img.appendChild(createCustomElement('p', 'text-name', imgText));
}

function trybe(section) {
  section.innerHTML = '';
  const div = createCustomElement('div', 'trybe');
  dataTrybers(div, 'images/sumo.png', 'Alexandre Sumoyama - Habemus');
  dataTrybers(div, 'images/ana.jpeg', 'Ana Laura Berger - Const a');
  dataTrybers(div, 'images/noel.png', 'André Noel - Barabam');
  section.appendChild(div);
  document.querySelector('.wellcome').innerHTML = 'Vamos sentir saudades !!!';
}

function message(section, msg) {
  section.innerHTML = '';
  const div = createCustomElement('div', 'message');
  div.innerHTML = msg;
  section.appendChild(div);
}

function addDetailsToItem(element, value) {
  const text = `<b>${element[0].toUpperCase()}${element.slice(1)}: </b>${value}`;
  const classe = `${element} abstract-info`;
  const div = createCustomElement('div', classe, text);
  if (element === 'institution') {
    div.addEventListener('click', newSearch);
  } else {
    div.addEventListener('click', handleItemCardClick);
  }
  return div;
}

function createItemCard(cardItems, index) {
  const detail = getItemDetailList(cardItems);
  const container = createCustomElement('section', 'item-cards');
  container.id = index;
  const sectionImgCard = createCustomElement('section', 'img-card');
  const image = createCustomImage(detail.img, 'image');
  image.addEventListener('click', handleItemCardClick);
  container.appendChild(sectionImgCard);
  sectionImgCard.appendChild(createCustomElement('div', 'title', detail.title.substring(0, 30)));
  sectionImgCard.appendChild(image);
  //Details
  const detailContainer = container.appendChild(createCustomElement('section', 'abstract'));
  const keys = Object.keys(detail);
  keys.forEach((element) => {
    if (element !== 'title' && element !== 'img') {
      //if (element !== 'description') detail[element] = detail[element].substring(0, 80);
      //detailContainer.appendChild(addDetailsToItem(element, detail[element]));
      detailContainer.appendChild(addDetailsToItem(element, detail[element].substring(0, 30)));
    }
  });
  return container
}

function creatorFilter(dcCreator) {
  const creator = (dcCreator !== undefined) ? dcCreator[0] : '';
  const regex = /^(https{0,1}:\/\/)/
  if (regex.test(creator)) {
    let result = creator.split('/');
    result = result[result.length - 1].split('Category:');
    return result[result.length - 1];
  }
  return creator
}

function getItemDetailList(item) {
  const notFoundImg = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
  const detail = {
    title: item.title[0],
    institution: (item.dataProvider !== undefined) ? item.dataProvider[0] : '',
    description: (item.dcDescription !== undefined) ? item.dcDescription[0] : '',
    country: (item.country !== undefined) ? item.country[0] : '',
    creator: creatorFilter(item.dcCreator),
    img: (item.edmPreview !== undefined) ? item.edmPreview[0] : notFoundImg,
  };
  return detail;
}


async function newSearch (e) {
  const query = e.target.innerText.split(':')[1];
  console.log(query);
  const data = await fetchItem(query);
  cardsSection.innerHTML = '';
  if (data.length === 0) message(cardsSection, 'Nenhum ítem encontrado!');
  cardsItems = data;
  console.log(cardsItems);

  for (let index=0; index < cardsItems.length; index += 1) {
    cardsSection.appendChild(createItemCard(cardsItems[index], index));
  }
}



async function loadArts () {
  document.querySelector('.wellcome').innerHTML = 'Museu Virtual Cultura Trybe. Toda a cultura e diversidade ao redor do mundo em um único lugar!';
  const query = document.querySelector('#art-search');
  const search = query.value;
  query.value = '';
  if (search.toUpperCase() === 'TRYBE') {
    trybe(cardsSection);
    return
  }
  if (search) {
    cardsSection.innerHTML = '';
    const data = await fetchItem(search);

    if (data.length === 0) message(cardsSection, 'Nenhum ítem encontrado!');
    cardsItems = data;
    console.log(cardsItems);
    for (let index = 0; index < cardsItems.length; index += 1) {
      cardsSection.appendChild(createItemCard(cardsItems[index], index));
    }
  }
}

function returnMainPage() {
  cardsSection.innerHTML = '';
  console.log(cardsItems);
  for (let index = 0; index < cardsItems.length; index += 1) {
    cardsSection.appendChild(createItemCard(cardsItems[index], index));
  }
}

function createDetailItemSection(data) {
  const detail = getItemDetailList(data);
  const container = createCustomElement('section', 'item-cards-details');
  const image = createCustomImage(detail.img, 'image');
  container.appendChild(image);
  container.appendChild(createCustomElement('div', 'title-detail', detail.title));
  const detailContainer = container.appendChild(createCustomElement('section', 'details'));
  const keys = Object.keys(detail);
  keys.forEach((element) => {
    if (element !== 'title' && element !== 'img') {
      const text = `<b>${element[0].toUpperCase()}${element.slice(1)}: </b>${detail[element]}`;
      const classe = `${element} detail-info`;
      const div = createCustomElement('div', classe, text);
      detailContainer.appendChild(div);
    }
  });
  const button = createCustomElement('button', 'btn-voltar', 'Voltar');
  button.addEventListener('click', returnMainPage);
  container.appendChild(button);
  return container
}

const getElementOrClosest = (sectionClass, target) =>
  target.classList.contains(sectionClass)
    ? target
    : target.closest(sectionClass);

const handleItemCardClick = ({ target }) => {
  const section = getElementOrClosest('.item-cards', target);
  cardsSection.innerHTML = '';
  const data = cardsItems[section.id];
  cardsSection.appendChild(createDetailItemSection(data));
};

const handleNavegaotrs = () => {
  const navegator = document.querySelector('#navegator').children;
  const nav = Array.from(navegator);
  nav.forEach((item) => {
    item.addEventListener('click', (event) => {
      const query = document.querySelector('#art-search');
      query.value = event.target.id;
      loadArts();
    })
  })
}

window.onload = () => {
  const button = document.querySelector('#btn-finder');
  button.addEventListener('click', loadArts);
  const input = document.querySelector('#art-search');
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') loadArts();
  });
  handleNavegaotrs();
}