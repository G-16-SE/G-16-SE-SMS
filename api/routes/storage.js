const { Router } = require("express");
const router = Router();

const StorageController = require("../controllers/storage");

const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/addgood", checkAuth, StorageController.addStorage);
router.post("/update/:id", checkAuth, StorageController.updateStorage);

router.post("/all", checkAuth, StorageController.getStorage);
router.post("/allgoods", checkAuth, StorageController.getStorageTypes);

