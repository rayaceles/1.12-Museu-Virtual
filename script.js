function createCustomElement(type, className = '', text = '') {
  const element = document.createElement(type);
  element.className = className;
  element.innerText = text;
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
    const li = createCustomElement('div', 'detail');
    let name = element[0].toUpperCase() + element.slice(1);
    name = name.replace('_', ' ') + ':';
    li.appendChild(createCustomElement('span', 'detail-name', name));
    const text = createCustomElement('span', 'detail-text');
    text.innerText = item[element];
    li.appendChild(text);
    ol.appendChild(li);
  });
  return ol
}

function createItemSection(item) {
  const detail = getItemDetailList(item);

  const container = createCustomElement('div', 'container');
  const image = createCustomImage(detail.img)
  container.appendChild(image);
  const div = createCustomElement('div', 'detail_container')
  container.appendChild(div)
  const details = addDetailsToItem(detail);
  container.appendChild(details);
  return container
}

function getItemDetailList(item) {
  const detail = {
    title: item.title[0],
    country: item.country[0],
    providing_institution: item.dataProvider[0],
    description: item.dcDescription[0],
    creator: item.dcCreator[0],
    img: item.edmPreview[0],
  };
  return detail;
}

window.onload = async () => {
  const a = await fetchItem('mona lisa');
  console.log(getItemDetailList(a[0]));
  const body = document.querySelector('body')
  const b = a[0].edmPreview[0]
  body.appendChild(createItemSection(a[0]))
}