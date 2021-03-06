const { Router } = require("express");
const router = Router();

const StorageController = require("../controllers/storage");

const checkAuth = require("../middlewares/authentication/user-auth");
const upload = require("../middlewares/uploads/image-upload");

router.post("/addgood" , checkAuth , StorageController.addStorage);
router.post("/update/:id", checkAuth, StorageController.updateStorage);
router.get("/all", checkAuth, StorageController.getStorage);

module.exports.storageRouter = router;
