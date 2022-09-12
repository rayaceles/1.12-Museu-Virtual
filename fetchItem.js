
function url(item) {
  const url = 'https://api.europeana.eu/record/v2/search.json?wskey='
  let result = `${url}${(typeof module !== 'undefined') ? 'teste' : apiKey}`;
  result += '&query=' + item.replace(' ', '+');
  return result
}

async function fetchItem(item) {
  const result = await fetch(url(item))
  const data = await result.json()
  return data.items;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem
  };
}