const { Router } = require("express");
const productController = require("../controllers/products.js");

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
