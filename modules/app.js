import products from "./product.js";

import {
  addCartItem,
  showCart,
  hideCart,
  setupApp,
  setCartValues,
} from "./cart.js";

const clearCartBtn = document.querySelector(".clear-cart");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");

let buttonsDOM = [];
let cart = [];

products.map((product) => {
  let item = (document.getElementById("container").innerHTML += `
  <div class=" product card m-2 shadow " style="width: 18rem;">
            <div class="card-body">
            <div class="img-container"><img src="${product["img"]}" class=" product-img card-img-top p-2" style="height: 10rem;" alt="image"></div>
              <h5 class="card-title">${product["title"]}</h5>
              <p class="card-text">Price: ${product["price"]}$</p>

            </div>
            <button  data-id=${product["id"]} class=" bag-btn btn btn-primary mb-2">Add to Cart</button>

            <div>
  `);
});

class Storage {
  static saveProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

cartButton();
function cartButton() {
  const buttons = [...document.querySelectorAll(".bag-btn")];
  buttonsDOM = buttons;
  buttons.forEach((button) => {
    let id = button.dataset.id;
    let inCart = cart.find((item) => item.id === id);
    if (inCart) {
      button.innerHTML = "In Cart";
      button.disabled = true;
    } else {
      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        cart = [...cart, cartItem];
        // Storage.saveCart(cart);
        setCartValues(cart);
        addCartItem(cartItem);
        showCart();
      });
    }
  });
  cartItems;
}

cartLogic();
function cartLogic() {
  clearCartBtn.addEventListener("click", cartClear);
}

function cartClear() {
  let cartItems = cart.map((item) => item.id);
  cartItems.forEach((id) => removeItem(id));
  while (cartContent.children.length > 0) {
    cartContent.removeChild(cartContent.children[0]);
  }
  hideCart();
}

extention();
function extention() {
  cartContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      let itemEvent = event.target;
      let id = itemEvent.dataset.id;
      cartContent.removeChild(itemEvent.parentElement);
      removeItem(id);
    } else if (event.target.classList.contains("increase-item")) {
      let addAmount = event.target;
      let id = addAmount.dataset.id;
      let tempItem = cart.find((item) => item.id === id);
      tempItem.amount = tempItem.amount += 1;

      setCartValues(cart);
      addAmount.nextElementSibling.innerText = tempItem.amount;
    } else if (event.target.classList.contains("decrease-item")) {
      let reduceAmount = event.target;
      let id = reduceAmount.dataset.id;
      let tempItem = cart.find((item) => item.id === id);
      tempItem.amount = tempItem.amount - 1;
      if (tempItem.amount > 0) {
        setCartValues(cart);
        reduceAmount.previousElementSibling.innerText = tempItem.amount;
      } else {
        cartContent.removeChild(reduceAmount.parentElement.parentElement);
        removeItem(id);
      }
    }
  });
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  setCartValues(cart);
  Storage.saveCart(cart);
  let button = getSingleButton(id);
  button.disabled = false;
  button.innerHTML = `Add to Cart`;
}

function getSingleButton(id) {
  return buttonsDOM.find((button) => button.dataset.id === id);
}

document.addEventListener("DOMContentLoaded", () => {
  setupApp();

  Storage.saveProduct(products);
});
