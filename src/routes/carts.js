const { Router } = require("express");
const cartsRouter = Router();

const CartManager = require("./cartsManager");
const cart = new CartManager("carts.json");

cartsRouter.get("/", (req, res) => {
  res.json(carts);
});
cartsRouter.get("/:cid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let products = await cart.getCartById(cartId);
  res.json(products);
});
cartsRouter.post("/", async (req, res) => {
  let id = await cart.getCreateId();
  await cart.createCart({ id: id, products: [] });
  res.send("carrito Creado");
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  let product1 = req.body;
  let cartId = parseInt(req.params.cid);
  let productId = parseInt(req.params.pid);
  await cart.addCart(product1, cartId, productId);
  res.send("item agregado");
});

module.exports = cartsRouter;
