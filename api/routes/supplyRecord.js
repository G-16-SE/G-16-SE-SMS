const { Router } = require("express");
const router = Router();

const SupplyRecordController = require("../controllers/supplyRecord");

const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/create" , checkAuth, SupplyRecordController.addSupplyRecord);
router.get("/single/:supId" , checkAuth, SupplyRecordController.getSupplyRecordBySupID);
router.get("/all" , checkAuth, SupplyRecordController.getSupplyRecords);
router.patch("/edit/:id" , checkAuth, SupplyRecordController.editSupplyRecord);
router.delete("/remove/:id" , checkAuth, SupplyRecordController.deleteSupplyRecordrByID);

module.exports.supplyRecordRouter = router;