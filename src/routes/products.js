const { Router } = require("express");
const productsRouter = Router();

const ProductsManager = require("./productsManager");
const manager = new ProductsManager("products.json");

productsRouter.get("/", async (req, res) => {
  let { limit } = req.query;
  let products = await manager.getProducts();
  if (limit == undefined) {
    res.send(products);
  } else {
    res.send(products.slice(0, limit));
  }
});

productsRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  let products = await manager.getProducts();
  const product = products.find((producto) => producto.id == id);
  res.send(product);
});

productsRouter.post("/agregar", async (req, res) => {
  let product = req.body;
  await manager.addProduct(product);
  res.send("Producto agregado");
});

productsRouter.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  let products = await manager.getProducts();
  const producto = products.find((p) => p.id === parseInt(id));
  if (!producto) {
    return res.status(404).send("El producto no existe");
  }

  // actualizar el producto con los datos de la solicitud
  producto.title = req.body.title;
  producto.description = req.body.description;
  producto.price = req.body.price;
  producto.thumbnail = req.body.thumbnail;
  producto.code = req.body.code;
  producto.stock = req.body.stock;
  // enviar la respuesta
  res.send("Producto Actualizado");
  await manager.updateProduct(producto);
});

productsRouter.delete("/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  let products = await manager.getProducts();
  const newArray = products.filter((obj) => obj.id !== id);
  let array = newArray;
  await manager.deleteProduct(array);
  console.log(array);
  res.send("Eliminado");
});

module.exports = productsRouter;
