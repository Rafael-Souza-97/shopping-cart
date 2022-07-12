require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toEqual('function');
  });

  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Verifica se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toStrictEqual(item);
  });

  it('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    const received = await fetchItem();
    expect(received).toEqual(new Error('You must provide an url'));
  });
});
