const express = require("express");
const router = express.Router();

const ManagerController = require('../controllers/manager');
const checkAuth = require('../middlewares/authentication/user-auth');

router.post("/update", checkAuth, ManagerController.manager_update);

module.exports = router;