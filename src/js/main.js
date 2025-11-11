import Alert from './alert.js';

const alert = new Alert();
alert.loadAlerts();

import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const tentList = new ProductList("tents", dataSource, listElement);
tentList.init();
