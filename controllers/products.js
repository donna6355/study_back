const productServices = require("../services/products");

const createProduct = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (
      !authorization ||
      !authorization.startsWith("Bearer ") ||
      !userServices.isAuthorized(authorization.replace("Bearer ", ""))
    ) {
      res.sendStatus(401);
      return;
    }
    const { name, price } = req.body;
    // Validate the request
    if (typeof name !== "string" || typeof price !== "number") {
      res.sendStatus(400);
      return;
    }
    const product = await productServices.createProduct(name, price);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // NaN
  const limit = parseInt(req.query.limit) || 10;
  const keyword = req.query.keyword ?? "";
  try {
    const products = await productServices.getAllProducts(page, limit, keyword);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

//url params similar to file directory order... indicate where it belongs
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productServices.getProduct(id);
    if (!product) {
      res.sendStatus(404);
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const isSuccessful = await productServices.updateProduct(id, name, price);
    if (!isSuccessful) {
      res.sendStatus(404);
      return;
    }

    res.json(isSuccessful);
    // res.json(product); //TODO 500 internal server error
    //how to get modified data?
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isSuccessful = await productServices.deleteProduct(id);
    if (!isSuccessful) {
      res.sendStatus(404);
      return;
    }
    res.json(isSuccessful);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
