const fs = require("fs");

class ProductsManager {
  products;
  constructor(file) {
    this.products = file;
  }
  async getCreateId() {
    try {
      const array = await fs.promises.readFile(this.products, "utf-8");
      let products = JSON.parse(array);
      let id = products.length + 1;
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.products, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(producto) {
    try {
      const data = await fs.promises.readFile(this.products, "utf-8");
      let array = JSON.parse(data);
      let nuevoId = await this.getCreateId();
      const encontrado = array.find((productos) => productos.id == nuevoId);
      if (!encontrado) {
        producto["id"] = nuevoId;
        array.push(producto);
        await fs.promises.writeFile(this.products, JSON.stringify(array));
        console.log(producto);
      } else {
        console.log(producto);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(producto) {
    try {
      const data = await fs.promises.readFile(this.products, "utf-8");
      let objeto = JSON.parse(data);
      let product = { ...producto };
      for (let i = 0; i < objeto.length; i++) {
        if (objeto[i].id === product.id) {
          objeto[i] = product;
          await fs.promises.writeFile(this.products, JSON.stringify(objeto));
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(delet) {
    try {
      await fs.promises.writeFile(this.products, JSON.stringify(delet));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductsManager;
