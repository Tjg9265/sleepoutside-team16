// ProductList.js
import { renderListWithTemplate } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    loadHeaderFooter();

    const list = await this.dataSource.getData(this.category);

    this.renderList(list);

    document.querySelector(".list-title").textContent =
      `Top Products: ${this.category.replace("-", " ")}`;
  }

  renderList(list) {
    renderListWithTemplate(
      this.productTemplate.bind(this),
      this.listElement,
      list
    );
  }

  productTemplate(product) {
    const imageURL = baseURL + product.PrimaryMedium;

    return `
      <li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
          <img src="${imageURL}" alt="${product.Name}" />
          <h3>${product.Name}</h3>
          <p class="price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
}
