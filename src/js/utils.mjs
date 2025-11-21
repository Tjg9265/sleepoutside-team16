// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a query parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// RENDER A LIST OF ITEMS USING A TEMPLATE
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (!parentElement) {
    console.error("renderListWithTemplate error: parentElement is null");
    return;
  }

  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// RENDER A SINGLE TEMPLATE
export function renderWithTemplate(template, parentElement, data, callback) {
  if (callback) {
    callback(data);
  }

  if (!parentElement) {
    console.error("renderWithTemplate error: parentElement is null");
    return;
  }

  // FIXED CAPITALIZATION ERROR – must be insertAdjacentHTML
  parentElement.insertAdjacentHTML("afterbegin", template);
}

export function animateCartIcon() {
  const cartIcon = document.getElementById("cartIcon");
  if (!cartIcon) return;

  // reset animation so it can replay
  cartIcon.classList.remove("cart-animate");
  void cartIcon.offsetWidth;

  cartIcon.classList.add("cart-animate");

  setTimeout(() => {
    cartIcon.classList.remove("cart-animate");
  }, 700);
}

// Load header and footer HTML partials into the page
export async function loadHeaderFooter() {
  // Load header
  const header = await fetch("/partials/header.html");
  const headerHtml = await header.text();
  document.getElementById("main-header").innerHTML = headerHtml;

  // Load footer
  const footer = await fetch("/partials/footer.html");
  const footerHtml = await footer.text();
  document.getElementById("main-footer").innerHTML = footerHtml;
}
