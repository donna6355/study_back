const { Router } = require("express");
const user = require("../controllers/user");

const router = Router();

//createUser, login, refresh, logout

router.post("/", user.createUser);
router.post("/login", user.login);
router.post("/refresh", user.refresh);
router.post("/logout", user.logout);

module.exports = router;
