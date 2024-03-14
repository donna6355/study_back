const db = require("../config/database");
const { DataTypes } = require("sequelize");

const Product = db.define(
  "Product", //table name
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
Product.sync(); //match columns, if it doesnt exist, create.

module.exports = Product;
