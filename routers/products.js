const { Router } = require("express");
const { getProduct, postProduct } = require("../controllers/products.js");

const productRouter = Router().get("/:id", getProduct).post("/", postProduct);
module.exports = productRouter;
