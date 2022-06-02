const { Router } = require("express");
const router = Router();

const ManagerController = require("../controllers/manager");

router.get("/all" , StorageController.getStorage);
router.post("/update" , StorageController.updateStorage);
router.post("/addgood" , StorageController.addGoods);
router.get("/allgoods" , StorageController.getStorage);