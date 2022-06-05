const { Router } = require("express");
const router = Router();

const SupplierController = require("../controllers/supplier");

const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/create", checkAuth , SupplierController.addSupplier);
router.get("/single/:name", checkAuth , SupplierController.getSupplierByName);
router.get("/single/:id", checkAuth , SupplierController.getSupplierById);
router.get("/all", checkAuth , SupplierController.getSuppliers);
router.post("/remove", checkAuth , SupplierController.deleteSuppliers);
router.post("/edit/:id", checkAuth , SupplierController.editSupplier);

module.exports.supplierRouter = router;
