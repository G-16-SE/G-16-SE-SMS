const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middlewares/authentication/user-auth');

router.post("/signup", checkAuth, UserController.manager_signup);
router.post("/signup-admin", UserController.admin_signup);
router.post("/admin-delete/:id", checkAuth , UserController.admin_delete);

router.post("/login", UserController.user_login);
router.post("/logout", checkAuth , UserController.user_logout);

module.exports = router;
