import Alerts from "./alerts.js";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header + footer
loadHeaderFooter();

// Load alerts
const alerts = new Alerts();
alerts.loadAlerts();

// Load products
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const tentList = new ProductList("tents", dataSource, listElement);
tentList.init();
