// Api ----->>  https://dummyjson.com/products
const productsCont = document.querySelector(".products-cont");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];
// console.log(cart);
// localStorage.clear();

setuP();

function setuP() {
  getProducts();
}

function getProducts() {
  fetch("https://dummyjson.com/products")
    .then((data) => data.json())
    .then((myData) => {
      products = myData.products;
      let Data = myData.products;
      showProducts(Data);
    });
}

function showProducts(myProducts) {
  myProducts.forEach((element) => {
    // console.log(element);
    productsCont.innerHTML += `
      <div class="product col-12 col-md-4 col-lg-3" data-id="${element.id}">
            <div class="card">
              <img src="${element.thumbnail}" class="card-img-top" />
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${element.brand}</h5>
                  <p class="card-price m-0">
                    <span class="fs-4 text-primary">$${
                      element.price
                    } </span> / piece
                  </p>
                  <p class="text-muted">Shipping via Eraasoft</p>
                </div>
                ${
                  cart.find((ele) => ele.id == element.id)
                    ? '<h5 class="fw-bolder text-center">Added to cart!</h5>'
                    : '<button href="#" class="btn btn-primary w-100 add-to-cart">Add to cart</button>'
                }
                
              </div>
            </div>
      `;
  });
  initializeEvents();
}

function initializeEvents() {
  let addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((btn) => {
    btn.onclick = () => {
      const parent = btn.closest(".product");
      // get product id
      let id = btn.closest(".product").dataset.id;
      const prodObj = cart.find((ele) => ele.id == id);

      // find the product data that contain id
      if (!prodObj) {
        const product = products.find((ele) => ele.id == id);
        // push data in array called cart
        cart.push({
          id: product.id,
          thumbnail: product.thumbnail,
          title: product.title,
          price: product.price,
          discount: product.discountPercentage,
          quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        btn.remove();
        parent.querySelector(
          ".card-body"
        ).innerHTML += `<h5 class="fw-bolder text-center">Added to cart!</h5>`;
        // btn.innerHTML = "Added to cart";
        // btn.style = "background-color:red";
        // console.log(cart);
      }

      // console.log(cart);
    };
  });
}
