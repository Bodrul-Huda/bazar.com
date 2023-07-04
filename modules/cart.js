const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const discountPrice = document.querySelector(".discount");
const netTotal = document.querySelector(".net-total");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

let cart = [];

function addCartItem(item) {
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `
  <img src="${item.img}">
    <div >
      <h4>${item.title}</h4>
      <h5>${item.price}</h5>
      <p data-id=${item.id}  class="increase-item ">+</p>
      <p class="item-amount">1</p>
      <p data-id=${item.id}  class="decrease-item">-</p>

    </div>

    <button data-id=${item.id} class="remove-item btn btn-danger">Remove</button>
  `;
  cartContent.appendChild(div);
}

function setCartValues(cart) {
  let tempTotal = 0;
  let itemsTotal = 0;
  let afterDiscount = 0;
  let discount = 0;

  cart.map((item) => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  cartItems.innerText = itemsTotal > 0 ? itemsTotal : "";

  if (itemsTotal >= 2) {
    discount = tempTotal * 0.1;
    discountPrice.innerText = parseFloat(discount.toFixed(2));
    afterDiscount = tempTotal - discount;
    netTotal.innerText = afterDiscount;
  } else if (itemsTotal < 2) {
    discount = 0;
    discountPrice.innerText = discount;
    netTotal.innerText = parseFloat(tempTotal.toFixed(2));
  }
}

function showCart() {
  cartOverlay.classList.add("transparentBcg");
  cartDOM.classList.add("showCart");
}
function hideCart() {
  cartOverlay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
}

function setupApp() {
  setCartValues(cart);
  populateCart(cart);
  cartBtn.addEventListener("click", showCart);
  closeCartBtn.addEventListener("click", hideCart);
}
setupApp();

function populateCart(cart) {
  cart.forEach((item) => addCartItem(item));
}

export {
  addCartItem,
  showCart,
  hideCart,
  setupApp,
  populateCart,
  setCartValues,
};
