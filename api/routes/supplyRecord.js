const { Router } = require("express");
const router = Router();

const SupplyRecordController = require("../controllers/supplyRecord");

const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/create" , SupplyRecordController.addSupplyRecord);
router.get("/single/:supId" , SupplyRecordController.getSupplyRecordBySupID);
router.get("/all" , SupplyRecordController.getSupplyRecords);
router.patch("/edit/:id" , SupplyRecordController.editSupplyRecord);
router.delete("/remove/:id" , SupplyRecordController.deleteSupplyRecordrByID);

module.exports.supplyRecordRouter = router;