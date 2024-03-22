const { Router } = require("express");
const productRouter = require("./products");
const user = require("./user");

const router = Router();

router.use("/user", user);
router.use("/products", productRouter);

module.exports = router;
