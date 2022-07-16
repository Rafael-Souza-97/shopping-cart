const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const totalCart = document.querySelector('.total-price');
const inputSearchDiv = document.querySelector('.inputSearch-div');
const cartSession = document.querySelector('.cart');
const loader = document.querySelector('.loader');
const searchButton = document.querySelector('.buttonPesquisar');
const inputSearch = document.querySelector('.input-product');

const createCartItemElement = ({ name, salePrice, image }) => {
  let button;
  const div = document.createElement('div');
  const li = document.createElement('li');
  div.className = 'divItem-cart';
  li.className = 'cart__item';
  li.appendChild(div);
  div.appendChild(createProductImageElement(image));
  div.appendChild(createSpan('span', 'cart-name', name))
  button = (createSpan('span', 'remove-product', "X"));
  div.appendChild(button);
  li.appendChild(createSpan('span', 'cartProduct-price', `${salePrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`))
  button.addEventListener('click', cartItemClickListener);
  return li;
};

const totalCartPrice = () => {
  const cartItems = document.querySelector('.cart__items');
  let value = 0;
  cartItems.childNodes.forEach((element) => {
    const str = element.lastElementChild.innerText;
    const clean = str.replace(/[^0-9,]*/g, '').replace(',', '.');
    console.log(clean);
    value += Number(clean);
  });
  totalCart.innerHTML = `Subtotal (${cartLength()} item(s)): <strong> ${value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>`;
}

const cartLength = () => {
  const cartLen = document.querySelector('.cart-length');
  cartLen.innerText = cartItems.children.length;
  return cartLen.innerText;
}

const createProductImageElement = (imageSource) => {
  const imageHD = imageSource.replace(/I.jpg/g, 'W.jpg');
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageHD;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, price, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createSpan('span', 'cart-price', `${price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const recoveryButton = () => {
  const removeButton = document.querySelectorAll('.remove-product');
  removeButton.forEach((element) => element.addEventListener('click', cartItemClickListener))
}

const cartItemClickListener = (event) => {
  event.target.parentElement.parentElement.remove();
  saveCartItems(cartItems.innerHTML);
  totalCartPrice();
  cartLength();
};

emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.innerHTML);
  totalCartPrice();
  cartLength();
});

const createSpan = (element, className, text) => {
  const e = document.createElement(element);
  e.innerText = text;
  e.className = className;
  return e;
}

const skuToCart = async (button) => {
  const sku = button.parentElement.querySelector('.item__sku').innerText;
  const product = await fetchItem(sku);
  const data = { sku: product.id, name: product.title, salePrice: product.price, image: product.thumbnail };
  cartItems.appendChild(createCartItemElement(data));
  saveCartItems(cartItems.innerHTML);
  totalCartPrice();
  cartLength();
};

const addCartBtn = () => {
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((btn) => btn.addEventListener('click', () => {
    skuToCart(btn);
  }));
};

const reqApi = async (param) => {
  const products = await fetchProducts(param);
  products.results.forEach((item) => {
  const { id, title, thumbnail, price } = item;
  const createItem = createProductItemElement({
    sku: id,
    name: title,
    price: price,
    image: thumbnail,
  });
  items.appendChild(createItem);
  });
  addCartBtn();
  recoveryButton();
};

const getItemsLocalStorage = () => {
  const get = getSavedCartItems();
  cartItems.innerHTML = get;
};

const getAllEvents = () => {
  const removeButton = document.querySelectorAll('.remove-cart');
  removeButton.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

const cartDisplayNone = () => {
  const cart = document.querySelector('.cart');
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.addEventListener('click',() => {
    if (cart.style.display !== 'none') {
      return cart.style.display = 'none';
    }
    if(cart.style.display !== 'flex') {
      return cart.style.display = 'flex';
    }
  })
}

const searchBar = () => {
  reqApi('iphone');
  searchButton.addEventListener('click', async () => {
    if(inputSearch.value === '') reqApi('computador');
    if(inputSearch.value.toLowerCase() === 'taça do mundial do palmeiras') window.alert('ERRO 404 - O Palmeiras não tem Mundial');
    items.innerHTML = '';
    reqApi(inputSearch.value);
    inputSearch.value = '';
  })
}

const loading = () => {
  items.style.display = 'none';
  inputSearchDiv.style.display = 'none';
  cartSession.style.display = 'none'
  setTimeout(() => {
    items.style.display = 'flex';
    inputSearchDiv.style.display = 'flex';
    loader.style.display = 'none'
    getItemsLocalStorage();
    getAllEvents();
    totalCartPrice();
    cartDisplayNone();
    cartLength();
    searchBar();
  }, 1500);
};

window.onload = () => {
  loading();
}
