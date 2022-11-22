const express = require("express");
const router = express.Router();
const UserControl = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/login", UserControl.userLogin);
router.post("/register", UserControl.userRegister);
router.get("/info", auth, UserControl.userInfo);

module.exports = router;
