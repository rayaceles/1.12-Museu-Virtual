const { creatorFilter } = require('../script.js');

const arg1 = ["http://imslp.org/wiki/Category:Pedro_I,_Dom"];
const arg2 = ["http://www.larramendi.es/aut/POLI20090013681"];

describe('Testa a função creatorFilter', () => {
  it('É chamado com o argumento arg1', () => {
    expect(creatorFilter(arg1)).toEqual('Pedro_I,_Dom')
  });
  it('É chamado com o argumento arg2', () => {
    expect(creatorFilter(arg2)).toEqual('POLI20090013681')
  });
});
