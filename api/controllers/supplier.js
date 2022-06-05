const crypto = require("crypto");

const Supplier = require("../services/database/Supplier");
const Address = require("../services/database/Address");

const validator = require("../validation/user_inputs");

exports.addSupplier = async(req, res , next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  const validation_result = validator.supplier_insert(req);

  if(validation_result.status){
    return res.status(400).json({
      message: validation_result.message,
    });
  }

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
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  const validation_result = validator.nameInput(req.params.name);

  if(validation_result.status){
    return res.status(400).json({
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
    data: result_search.values
  });

};

exports.getSupplierById = async (req , res , next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  let result_search = await Supplier.findByName( req.params.id);

  if(!result_search.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: result_search.values
  });

};

exports.getSuppliers = async (req , res , next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  let result_search = await Supplier.findAll();

  if(!result_search.status){
    return res.status(500).json({
      message: "Search Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: result_search.values
  });

};

exports.deleteSuppliers = async (req , res , next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  if(req.body){
    req.body.selectedrows.forEach( async (row)=> {
      let result_supplier = await Supplier.findById(row.id);

      if(!result_supplier.status){
        return res.status(500).json({
          message: "Search Failed for id "+ row.id,
        });
      }

      if(result_supplier.values.length < 1){
        return res.status(400).json({
          message: "Supplier not found for id "+ row.id,
        })
      }

      const supplier = result_supplier.values[0];
  
      let result_delete_supplier = await Supplier.deleteRecord(supplier.id);

      if(!result_delete_supplier.status){
        return res.status(500).json({
          message: "Delete Failed for id "+ row.id,
        });
      }

    })

    return res.status(201).json({
      message: "Delete Success!",
    });
  }else {
    return res.status(400).json({
      message: "Empty input for deletion",
    })
  }

  

};

exports.editSupplier = async (req , res , next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  const validation_result = validator.supplier_update(req);

  if(validation_result.status){
    return res.status(400).json({
      message: validation_result.message,
    });
  }

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

  req.body.id = req.params.id;

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



