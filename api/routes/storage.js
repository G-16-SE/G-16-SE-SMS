const { Router } = require("express");
const router = Router();

const StorageController = require("../controllers/storage");

const checkAuth = require("../middlewares/authentication/user-auth");
const upload = require("../middlewares/uploads/image-upload");

router.post("/addgood" , upload.upload_image.single('image') , StorageController.addStorage);
router.post("/update/:id", StorageController.updateStorage);

router.get("/all", StorageController.getStorage);

module.exports.storageRouter = router;
