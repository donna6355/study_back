const { Router } = require("express");

const router = Router();

//createUser, login, refresh, logout

router.post("/");
router.post("/login");
router.post("/refresh");
router.post("/logout");

module.exports = router;
