const express = require("express");
const router = express.Router();

const ManagerController = require("../controllers/manager");
const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/update", checkAuth, ManagerController.manager_update);
router.get("/profile", checkAuth, ManagerController.get_manager);


module.exports = router;
