const data = require('./data/data.js')

const validSearch = 'Mona Lisa'
const baseUrl = `https://api.europeana.eu/record/v2/search.json?wskey=teste&query=`
const validURL = `${baseUrl}${validSearch.replace(' ', '+')}`


async function fetchSimulator(url) {
  if (validURL !== url) {
    throw new console.error('Item invalido');
  }
  return {json: () => data}
}

global.fetch = fetchSimulator;
afterEach(jest.clearAllMocks);


module.exports = {fetchSimulator}