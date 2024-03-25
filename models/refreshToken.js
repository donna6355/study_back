const db = require("../config/database");
const { DataTypes } = require("sequelize");

const RefreshToken = db.define("refreshToken", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

RefreshToken.sync();

//delete logic??
module.exports = RefreshToken;
