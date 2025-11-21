// product.js
import ProductData from "./ProductData.mjs";
import { getParam, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

// Load header/footer
loadHeaderFooter();

// Read product ID from URL (?product=12345)
const productId = getParam("product");

// Data source to talk to the API
const dataSource = new ProductData();

// MAIN FUNCTION: Load and display product detail
async function loadProductDetails() {
  const product = await dataSource.findProductById(productId);

  // Render page content
  renderProductDetails(product);
}

// RENDER PAGE CONTENT
function renderProductDetails(product) {
  // Build image URL using PrimaryLarge from API
  const imageURL = baseURL + product.PrimaryLarge;

  // Update the product page
  document.querySelector("#productName").textContent = product.Name;
  document.querySelector("#productImage").src = imageURL;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productDescription").textContent = product.Description;
  document.querySelector("#productPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;
}

// ADD PRODUCT TO CART
function addToCartHandler() {
  dataSource.findProductById(productId).then(product => {
    setLocalStorage("so-cart", product);
  });
}

// EVENT LISTENER
document.querySelector("#addToCart")
  .addEventListener("click", addToCartHandler);

// Start everything
loadProductDetails();
