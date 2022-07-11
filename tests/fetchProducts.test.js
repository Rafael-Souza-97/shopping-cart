require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('Verifica se "fetch" foi chamada ao passar a função fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Verifica ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const expected = await fetchProducts('computador')
    expect(expected).toEqual(computadorSearch);
  });

  it('Verifica se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    expect.assertions(1);
    const received = await fetchProducts();
      expect(received).toEqual('You must provide an url');
  });
});
