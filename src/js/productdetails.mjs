import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // find the product by ID
      this.product = await this.dataSource.findProductById(this.productId);

      // Render product details on the page
      this.renderProductDetails();

      // add event listener to "Add to Cart" button
      document.getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    } catch (error) {
      console.error('Error al inicializar el producto:', error);
    }
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // name of the product
    document.querySelector('.product-detail__name').textContent = this.product.Name;

    // Description HTML
    document.querySelector('.product-detail__description').innerHTML = this.product.DescriptionHtmlSimple;

    // final price
    document.querySelector('.product-detail__price').textContent = `$${this.product.FinalPrice}`;

    // Color 
    const color = this.product.Colors?.[0]?.ColorName || 'N/A';
    document.querySelector('.product-detail__color').textContent = color;

    // Product Image
    const imageElement = document.querySelector('.product-detail__image img');
    imageElement.src = this.product.Image;
    imageElement.alt = this.product.Name;

    // update "Add to Cart" button data-id attribute
    const button = document.getElementById('addToCart');
    button.setAttribute('data-id', this.product.Id);
  }
}