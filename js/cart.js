let cartContent = document.querySelector(".cart tbody");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let itemsNumber = document.querySelector(".items-num");
let totalPriceContainer = document.querySelector(".total-price");
let totalItemsNumber = (itemsNumber.textContent = cart.length);

function showProducts() {
  cart.forEach((product) => {
    cartContent.innerHTML += `
        <tr class="cart-product" data-id="${product.id}">
              <td>
                <div class="d-flex gap-3 align-items-center">
                  <img class="cart-product-img" src="${product.thumbnail}" />
                  <h5>${product.title}</h5>
                </div>
              </td>
              <td>
                <div class="cart-product-amount">
                  <span class="change-amount change-amount-dec">-</span>
                  <span class="quantity">${product.quantity}</span>
                  <span class="change-amount change-amount-inc">+</span>
                </div>
              </td>
              <td>
                <div class="mb-2 d-flex flex-column text-end justify-content-end align-items-end">
                  <span class="fw-bolder fs-4">${product.price}$</span>
                  <span class="remove-product"> Remove </span>
                </div>
              </td>
            </tr>
        `;
  });
}

function initializeEvents() {
  const increaseButtons = document.querySelectorAll(".change-amount-inc");
  const decreaseButtons = document.querySelectorAll(".change-amount-dec");
  //   increase Buttons ++
  increaseButtons.forEach((btn) => {
    btn.onclick = () => {
      let parent = btn.closest(".cart-product");
      let id = parent.dataset.id;
      let productObject = cart.find((ele) => {
        if (ele.id == id) {
          return ele;
        }
      });
      productObject.quantity++;
      parent.querySelector(".quantity").textContent = productObject.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      countTotalPrice();
    };
  });
  //   decrease Buttons --
  decreaseButtons.forEach((btn) => {
    btn.onclick = () => {
      let parent = btn.closest(".cart-product");
      let id = parent.dataset.id;
      let productObject = cart.find((ele) => {
        if (ele.id == id) {
          return ele;
        }
      });
      if (productObject.quantity > 1) {
        productObject.quantity--;
      }
      parent.querySelector(".quantity").innerHTML = productObject.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      countTotalPrice();
    };
  });
}

function RemoveProducts() {
  // remove all
  let removeAllButton = document.querySelector(".remove-all-products");
  removeAllButton.onclick = () => {
    cartContent.innerHTML = "";
    // localStorage.clear();
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    itemsNumber.textContent = cart.length;
    countTotalPrice();
  };
  // remove item
  let removeItemButton = document.querySelectorAll(".remove-product");
  removeItemButton.forEach((btn) => {
    btn.onclick = () => {
      let parent = btn.closest(".cart-product");
      let id = parent.dataset.id;
      cart = cart.filter((ele) => ele.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      parent.remove();
      itemsNumber.textContent = cart.length;
      countTotalPrice();
    };
  });
}

function countTotalPrice() {
  let totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity + `$`;
  }, 0);
  totalPriceContainer.textContent = totalPrice;
}

function setUp() {
  showProducts();
  initializeEvents();
  RemoveProducts();
  countTotalPrice();
}

setUp();
