const db = require("../config/database");
const { DataTypes } = require("sequelize");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();

module.exports = User;
