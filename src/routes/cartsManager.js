const fs = require("fs");

class CartManager {
  cart;
  constructor(file) {
    this.cart = file;
  }
  async getCreateId() {
    try {
      const array = await fs.promises.readFile(this.cart, "utf-8");
      let products = JSON.parse(array);
      if (products.length !== 0) {
        let id = products.length + 1;
        return id;
      } else {
        let id = 1;
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createCart(cartVacio) {
    try {
      const array = await fs.promises.readFile(this.cart, "utf-8");
      let products = JSON.parse(array);
      products.push(cartVacio);
      await fs.promises.writeFile(this.cart, JSON.stringify(products));
    } catch (error) {}
  }
  async addCart(product, cartId, productId) {
    try {
      const array = await fs.promises.readFile(this.cart, "utf-8");
      let products = JSON.parse(array);
      let cart = products.find((cart) => cart.id === cartId);
      if (cart) {
        let productIndex = cart.products.findIndex(
          (p) => p.products === productId
        );
        if (productIndex !== -1) {
          // si ya existe el producto en el carrito, incrementar la cantidad
          cart.products[productIndex].quantity += product.quantity;
        } else {
          // si el producto no existe en el carrito, agregarlo
          let newProduct = {
            products: productId,
            quantity: product.quantity,
          };
          cart.products.push(newProduct);
        }
        await fs.promises.writeFile(this.cart, JSON.stringify(products));
        console.log("Producto agregado al carrito");
      } else {
        // si el carrito no existe, crearlo y agregar el producto
        let newCart = {
          id: cartId,
          products: [
            {
              products: productId,
              quantity: product.quantity,
            },
          ],
        };
        products.push(newCart);
        await fs.promises.writeFile(this.cart, JSON.stringify(products));
        console.log("Se creó un nuevo carrito y se agregó el producto");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getCartById(id) {
    try {
      const array = await fs.promises.readFile(this.cart, "utf-8");
      let carts = JSON.parse(array);
      let cart = carts.find((cart) => cart.id === id);
      if (cart) {
        return cart.products;
      } else {
        console.log("El carrito no existe");
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = CartManager;
