const { Router } = require("express");
const router = Router();

const StorageController = require("../controllers/storage");

const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/addgood", StorageController.addStorage);
router.post("/update/:id", StorageController.updateStorage);

router.get("/all", StorageController.getStorage);

module.exports.storageRouter = router;