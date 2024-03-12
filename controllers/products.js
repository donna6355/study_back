const getProduct = (req, res) => {
  res.sendStatus(200);
  console.log(req.params.id);
};

const postProduct = (req, res) => {
  console.log(req.body.id);
  console.log(req.body.desc);
  res.sendStatus(201);
};
module.exports = { getProduct, postProduct };

// const productServices = require("../services/product");

// const createProduct = async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     // Validate the request
//     if (typeof name !== "string" || typeof price !== "number") {
//       res.sendStatus(400);
//       return;
//     }
//     const product = await productServices.createProduct(name, price);
//     res.status(201).json(product);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// };

// module.exports = {
//   createProduct,
// };
