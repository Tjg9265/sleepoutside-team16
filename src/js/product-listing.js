// product-listing.js

import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header & footer HTML
loadHeaderFooter();

// Get the category passed in the URL (?category=tents)
const category = getParam('category');

// Create data source (will fetch from API later)
const dataSource = new ProductData();

// Select the area where we will display the products
const listElement = document.querySelector('.product-list');

// Create the product list handler
const myList = new ProductList(category, dataSource, listElement);

// Initialize the list (render all items)
myList.init();

// OPTIONAL: Update page title to match category
const titleElement = document.querySelector('.list-title');
if (titleElement) {
  titleElement.textContent = `Top Products: ${category.replace('-', ' ')}`;
}
