function baseUrl(item) {
  let result = 'https://api.europeana.eu/record/v2/search.json?wskey=' + apiKey;
  result += '&query=' + item.replace(' ', '+');
  return result
}


async function teste(item) {
  const url = baseUrl(item)
  const result = await fetch(url)
  const data = await result.json()
  console.log(data)
}

teste('mona lisa')


