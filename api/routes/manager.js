const express = require("express");
const router = express.Router();

const ManagerController = require("../controllers/manager");
const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/update", ManagerController.manager_update);
router.get("/profile", ManagerController.get_manager);


module.exports = router;
