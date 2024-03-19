const db = require("../config/database");
const { DataTypes } = require("sequelize");

const Product = db.define(
  "products", //table name
  {
    // define column
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }
  //   {
  //     timestamps: false,
  //     indexes: [],
  //   }
);

// // https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
Product.sync({ alter: true }); //better to use migrate

/*
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/
module.exports = Product;
