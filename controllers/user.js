const zod = require("zod"); //schema declaration and validation
const ms = require("ms"); // convert to milliseconds format
const userService = require("../services/user");

const createUser = async (req, res) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.sendStatus(400);
    const { email, password } = parsed.data;
    const user = await userService.createUser(email, password);
    if (user == null) return res.sendStatus(409);
    res.sendStatus(201); //login only save email and pw, not create token???
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const login = async (req, res) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.sendStatus(404);
    const { email, password } = parsed.data;
    const result = await userService.login(email, password);
    if (!result) return res.sendStatus(404);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES_IN),
    });
    res.json({ accessToken: result.accessToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const result = await userService.refreshToken(refreshToken);
    if (!result) return res.sendStatus(404);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES_IN),
    });
    res.json({ accessToken: result.accessToken });
  } catch (error) {
    console.error(error);
    res.cookie("refreshToken", "", {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: 0,
    });
    res.sendStatus(500);
  }
};
const logout = async (req, res) => {
  try {
    //TODO no auth check????
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(400);
    const refreshToken = req.cookies.refreshToken;
    const result = await userService.logout(refreshToken);
    if (!result) return res.sendStatus(400);
    //auto login need to keep???? gotta remove refresh token???
    res.cookie("refreshToken", "", {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: 0,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(9999),
});

module.exports = {
  createUser,
  login,
  refresh,
  logout,
};
