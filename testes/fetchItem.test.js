require('./fetchSimulator')
const { fetchItem } = require('../fetchItem');
const data = require('./data/data.js')
const item = 'Mona Lisa';

describe('Testa a funcionalidade da função fetchItem',  () => {
  it('Ao chamar a função fetchItem com o argumento "Mona Lisa" retorna ', async () => {
    const response = await fetchItem(item);
      expect(response).toEqual(data.items)
  })
}) 