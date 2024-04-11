const db = require("../config/database");
const { Op, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const RefreshToken = require("./refreshToken");

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

User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// encrypt password
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  user.password = hashedPassword;
});

// password compare
User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// issue jwt
User.prototype.generateAccessToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

// verify jwt
User.verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// issue refresh token
User.prototype.generateRefreshToken = async function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
  const expiredAt = new Date(
    Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES_IN)
  );

  await RefreshToken.create({
    token,
    userId: this.id,
    expiresAt: expiredAt,
  });

  return token;
};

// hook
//verify refresh token
User.getUserByRefreshToken = async function (refreshToken) {
  const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const user = await User.findOne({
    include: "refreshTokens",
    where: {
      id,
      "$refreshTokens.token$": refreshToken,
      "$refreshTokens.expiresAt$": { [Op.gte]: new Date() },
    },
  });
  return user; //returns null always...TT // multi refreshtokens are saved... how to handle them..
};

// remove refresh token
User.removeRefreshToken = async function (refreshToken) {
  await RefreshToken.destroy({ where: { token: refreshToken } });
};

User.sync();

module.exports = User;
