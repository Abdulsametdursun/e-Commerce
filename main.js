//! Come from HTML
const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const cartBtn = document.querySelector("#cart-btn");
const closeBtn = document.querySelector("#close-btn");
const modal = document.querySelector(".modal-wrapper");

// to watch html while loading
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});

/**
 * get category info
 * 1. get request from API
 * 2. process incoming data
 * 3. print data to screen
 * 4. show the error to user
 */
const baseUrl = "https://fakestoreapi.com";

function fetchCategories() {
  fetch(`${baseUrl}/products/categories`)
    .then((response) => response.json())
    .then(renderCategories) // when "then" is run, the function sends data as parameters
    .catch((err) => alert("There is a error by data"));
}

// creat cart for each category
function renderCategories(categories) {
  categories.forEach((category) => {
    console.log(categories);
    //1-create div
    const categoryDiv = document.createElement("div");
    //2-add class to div
    categoryDiv.classList.add("category");
    //3-determining the content
    const randomNum = Math.round(Math.random() * 100);
    categoryDiv.innerHTML = `
            <img src="https://picsum.photos/300/300?r=${randomNum}" />
            <h1>${category}</h1>
    `;
    //4-send to HTML
    categoryList.appendChild(categoryDiv);
  });
}

// function to get data
async function fetchProducts() {
  try {
    // request from API
    const response = await fetch(`${baseUrl}/products`);
    // answer from API
    const data = await response.json();
    //print to screen
    renderProducts(data);
  } catch (err) {
    alert("There is an error while getting data");
  }
}

// print items
function renderProducts(products) {
  // creat carts for items
  const cartsHTML = products
    .map(
      (product) => `
            <div class="cart">
            <div class="img-wrapper">
              <img src="${product.image}">
            </div>
            <h4>${product.title}</h4>
            <h4>${product.category}</h4>
            <div class="info">
              <span>${product.price}</span>
              <button>Add to cart</button>
            </div>
          </div>
  `
    )
    .join(" ");

  // print HTML
  productList.innerHTML = cartsHTML;
}

// cart
cartBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("modal-wrapper") ||
    e.target.id === "close-btn"
  ) {
    modal.classList.remove("active");
  }
});
