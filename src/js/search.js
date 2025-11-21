// Load product data from local JSON
async function loadProducts() {
  const response = await fetch('/json/tents.json');
  return await response.json();
}

// Display results on the page
function renderResults(products) {
  const list = document.querySelector('#product-list');

  if (!list) return;

  list.innerHTML = '';

  if (products.length === 0) {
    list.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.Image}" alt="${product.Name}">
      <h3>${product.Name}</h3>
      <p>$${product.FinalPrice}</p>
    `;

    list.appendChild(card);
  });
}

// Search function
async function handleSearch(query) {
  const products = await loadProducts();

  const filtered = products.filter(p =>
    p.Name.toLowerCase().includes(query.toLowerCase())
  );

  // Save results for use on search page
  localStorage.setItem('searchResults', JSON.stringify(filtered));

  // Navigate to search results page
  window.location.href = '/search/index.html';
}

// Add event listener for form
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');

if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch(searchInput.value.trim());
  });
}

// If on the search page, load results
if (window.location.pathname.includes('/search')) {
  const results = JSON.parse(localStorage.getItem('searchResults')) || [];
  renderResults(results);
}
