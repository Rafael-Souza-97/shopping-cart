const saveCartItems = (param) => {
  try {
    localStorage.setItem('cartItems', param);
  } catch (error) {
    return new Error('Erro');
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
