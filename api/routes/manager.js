const express = require("express");
const router = express.Router();

const ManagerController = require("../controllers/manager");
const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/update", ManagerController.manager_update);
// router.post("/add", ManagerController.add_manager);
// router.get("/all", ManagerController.get_managers);

module.exports = router;
