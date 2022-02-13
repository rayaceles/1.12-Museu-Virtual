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

function addDetailsToItem(item) {
  const ol = createCustomElement('ol', 'item-details');
  delete item.img;
  const keys = Object.keys(item);
  
  keys.forEach(element => {
    const li = createCustomElement('li', 'detail');
    const name = `<b>${element[0].toUpperCase()}${element.slice(1)}: </b>`;
    li.appendChild(createCustomElement('span', element, name));
    const text = createCustomElement('span', 'detail-text');
    text.innerText = item[element];
    li.appendChild(text);
    ol.appendChild(li);
  });
  return ol
}

function createItemSection(item) {
  const detail = getItemDetailList(item);
  const container = createCustomElement('section', 'item-cards');
  const image = createCustomImage(detail.img)
  container.appendChild(image);
  // const div = createCustomElement('div', 'detail_container')
  // const div = createCustomElement('div', 'container')
  // container.appendChild(div)
  const details = addDetailsToItem(detail);
  container.appendChild(details);
  return container
}

function getItemDetailList(item) {
  const detail = {
    title: item.title[0],
    country: item.country[0],
    institution: (item.dataProvider !== undefined) ? item.dataProvider[0] : '',
    description: (item.dcDescription !== undefined) ? item.dcDescription[0] : '',
    creator: (item.dcCreator !== undefined) ? item.dcCreator[0] : '',
    img: item.edmPreview[0],
  };
  return detail;
}

async function loadArts () {
  const query = document.querySelector('#art-search');
  if (query.value) {
    const section = document.querySelector('.items');
    section.innerHTML = '';
    const data = await fetchItem(query.value);
    console.log(data);
    data.forEach((item) => {
      section.appendChild(createItemSection(item));
    });
  }
  query.value = '';
}

window.onload = () => {
  const button = document.querySelector('#btn-finder');
  button.addEventListener('click', loadArts);
}