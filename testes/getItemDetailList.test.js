const data = require('./data/data.js');

const {getItemDetailList} = require('../script.js');
const item = data.items[0];
const result = {
  country: "Sweden",
  creator: "Östring, Bill",
  description: "Kryssningsfartyget MONA LISA, f.d. KUNGSHOLM (4), Saltsjön, september 2003.",
  img: "https://api.europeana.eu/thumbnail/v2/url.json?uri=http%3A%2F%2Fmm.dimu.org%2Fimage%2F022uMWqCMnSh%3Fdimension%3D1200x1200&type=IMAGE",
  institution: "National Maritime Museum",
  title: "Kryssningsfartyget MONA LISA, f.d. KUNGS",
};

describe('Testa a função getItemDetailList', () => {
  it('Ao chamar com a função com o argumento item retorna result', () => {

    expect(getItemDetailList(item)).toEqual(result);
  })
});
