const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middlewares/authentication/user-auth');
const login_signup_validator = require('../middlewares/validations/login-signup')

router.post("/signup", login_signup_validator.manager_signup , checkAuth , UserController.manager_signup);
router.post("/signup-admin", UserController.admin_signup);

router.post("/login", login_signup_validator.login , UserController.user_login);

module.exports = router;
