const User = require("../models/user");
const createUser = async (email, password) => {
  try {
    //check unique email
    const exist = await User.findOne({ where: { email } });
    if (exist) return null; // already registered email, impossible to create new account
    await User.create({ email, password });
    return true;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    //check if the email is registered
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    //check if valid password
    const valid = await user.isValidPassword(password);
    if (!valid) return null;
    //either way return null for security reason. if it returns wrong password or not registered, it could give clue to hackers

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const user = await User.getUserByRefreshToken(refreshToken);
    if (!user) return null;

    const accessToken = user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw error;
  }
};

const logout = async (refreshToken) => {
  try {
    await User.removeRefreshToken(refreshToken);
  } catch (error) {
    throw error;
  }
};

// access token이 유효하면 true를 반환
const isAuthorized = (token) => {
  return User.verifyToken(token);
};

module.exports = {
  createUser,
  login,
  refreshToken,
  logout,
  isAuthorized,
};
