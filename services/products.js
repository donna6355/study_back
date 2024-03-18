const Product = require("../models/product");
const { Op } = require("sequelize");

const createProduct = async (name, price) => {
  const product = await Product.create({ name, price });
  return product;
};

const getAllProducts = async (page, limit, keyword) => {
  const total = await Product.count(); //?? not for the searched items??
  const lastPage = Math.ceil(total / limit);
  const products = await Product.findAll({
    where: { name: { [Op.like]: `%${keyword}%` } },
    limit, //how many items
    offset: (page - 1) * limit, // except first n items
  });
  return { products, total, lastPage };
};

const getProduct = async (id) => {
  const product = await Product.findByPk(id); //find by primary key
  return product;
};

const updateProduct = async (id, name, price) => {
  const result = await Product.update({ name, price }, { where: { id } });
  return result[0] > 0;
};

const deleteProduct = async (id) => {
  const result = await Product.update(
    { deletedAt: new Date() },
    { where: { id } }
  );
  //   Product.destroy() hard delete
  return result[0] > 0;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
