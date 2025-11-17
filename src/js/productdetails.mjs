import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // Buscar el producto por ID
      this.product = await this.dataSource.findProductById(this.productId);

      // Renderizar los detalles del producto
      this.renderProductDetails();

      // Agregar listener al botón "Add to Cart"
      const button = document.getElementById('addToCart');
      if (button) {
        button.addEventListener('click', this.addProductToCart.bind(this));
      }
    } catch (error) {
      console.error('Error al inicializar el producto:', error);
    }
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // Nombre del producto (usando el <h2 class="divider">)
    const nameEl = document.querySelector('h2.divider');
    if (nameEl) nameEl.textContent = this.product.Name;

    // Descripción del producto
    const descEl = document.querySelector('.product__description');
    if (descEl) descEl.innerHTML = this.product.DescriptionHtmlSimple;

    // Precio final
    const priceEl = document.querySelector('.product-card__price');
    if (priceEl) priceEl.textContent = `$${this.product.FinalPrice}`;

    // Color
    const colorEl = document.querySelector('.product__color');
    if (colorEl) {
      const color = this.product.Colors?.[0]?.ColorName || 'N/A';
      colorEl.textContent = color;
    }

    // Imagen del producto
    const imageEl = document.querySelector('img.divider');
    if (imageEl) {
      imageEl.src = this.product.Images.PrimaryLarge;
      imageEl.alt = this.product.Name;
    }

    // Actualizar el atributo data-id del botón
    const button = document.getElementById('addToCart');
    if (button) {
      button.setAttribute('data-id', this.product.Id);
    }
  }
}