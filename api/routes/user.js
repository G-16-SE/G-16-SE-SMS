const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/signup", checkAuth, UserController.manager_signup);
router.post("/signup-admin", UserController.admin_signup);
router.delete("/manager-delete/:id", checkAuth, UserController.manager_delete);
router.post("/managers-delete", checkAuth, UserController.manager_delete);
router.post("/manager-update", checkAuth, UserController.manager_update);

router.get("/managers", checkAuth, UserController.get_managers);

router.post("/login", UserController.user_login);
router.get("/logout", UserController.user_logout);

module.exports = router;
