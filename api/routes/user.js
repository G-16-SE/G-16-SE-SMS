const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/signup", UserController.manager_signup);
router.post("/signup-admin", UserController.admin_signup);
router.delete("/manager-delete/:id", UserController.manager_delete);

router.post("/login", UserController.user_login);
router.get("/logout", UserController.user_logout);

module.exports = router;
