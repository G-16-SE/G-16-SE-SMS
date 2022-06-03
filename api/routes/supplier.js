const { Router } = require("express");
const router = Router();

const SupplierController = require("../controllers/supplier");

const checkAuth = require("../middlewares/authentication/user-auth");

router.post("/create" , SupplierController.addSupplier);
router.get("/single/:name" , SupplierController.getSupplierByName);
router.get("/single/:id" , SupplierController.getSupplierById);
router.get("/all" , SupplierController.getSuppliers);
router.delete("/remove" , SupplierController.deleteSupplierById);
router.post("/edit/:id" , SupplierController.editSupplier);

module.exports.supplierRouter = router;
