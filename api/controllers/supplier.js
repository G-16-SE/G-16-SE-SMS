const Supplier = require("../services/database/Supplier");
const Address = require("../services/database/Address");

const validator = require("../validation/user_inputs");

exports.addSupplier = async(req, res , next) => {
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  const validation_result = validator.supplier_insert(req);

  if(validation_result.status){
    return res.status(401).json({
      message: validation_result.message,
    });
  }

  req.body.addressId = generateUniqueID();

  let result_suplier = await Supplier.insertRecord(req);

  if(!result_suplier.status){
    return res.status(500).json({
      message: "Insertion Failed",
    });
  }

  return res.status(201).json({
    message: "Insertion Success!",
  });

};

exports.getSupplierByName = async (req , res , next) => {
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  const validation_result = validator.nameInput(req.params.name);

  if(validation_result.status){
    return res.status(401).json({
      message: validation_result.message,
    });
  }

  const searchName = "%" + req.params.name + "%";

  let result_search = await Supplier.findByName(searchName);

  if(!result_search.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: res.values
  });

};

exports.getSupplierById = async (req , res , next) => {
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  let result_search = await Supplier.findByName( req.params.id);

  if(!result_search.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: res.values
  });

};

exports.getSuppliers = async (req , res , next) => {
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  let result_search = await Supplier.findAll();

  if(!result_search.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: result_search .values

  });

};

exports.deleteSupplierById = async (req , res , next) => {
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  let result_supplier = await Supplier.findById(req.params.id);

  if(!result_supplier.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  if(result_supplier.values.length < 1){
    return res.status(400).json({
      message: "Supplier not found"
    })
  }

  const supplier = result_supplier.values[0];
  
  let result_delete_supplier = await Supplier.deleteRecord(supplier.address_id , supplier.id);

  if(!result_delete_supplier){
    return res.status(500).json({
      message: "Delete Failed",
    });
  }

  return res.status(201).json({
    message: "Delete Success!",
  });

};

exports.editSupplier = async (req , res , next) => {
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  const validation_result = validator.supplier_update(req);

  if(validation_result.status){
    return res.status(401).json({
      message: validation_result.message,
    });
  }

  let result_supplier = await Supplier.findById(req.body.id);

  if(!result_supplier.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  if(result_supplier.values.length < 1){
    return res.status(400).json({
      message: "Supplier not found"
    })
  }

  req.body.addressId = result_supplier.values[0].address_id;

  let result_update = await Supplier.updateRecord(req);

  if(!result_update.status){
    return res.status(500).json({
      message: "Update Failed",
    });
  }

  return res.status(201).json({
    message: "Update Success!",
  });

};

function generateUniqueID() {
  return crypto.randomBytes(8).toString("hex");
}



