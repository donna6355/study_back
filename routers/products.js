const { Router } = require("express");
const { getProduct, postProduct } = require("../controllers/products.js");

const productRouter = Router().get("/:id", getProduct).post("/", postProduct);
module.exports = productRouter;

// const { Router } = require("express");
// const productController = require("../controllers/product");

// const router = Router();

// router.post("/", productController.createProduct);

// module.exports = router;
