const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
<<<<<<< HEAD
  constructor(category) {
    this.category = category;

    // FIXED PATH - correct for Vite and your folder structure
    this.path = `json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
=======
  constructor() {

  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
>>>>>>> 13622b669c73b08d456b93d797363472ddeb1b3f
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id} `);
    const data = await convertToJson(response);
    return data.Result;
  }
}
