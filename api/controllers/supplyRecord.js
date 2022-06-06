const validator = require("../validation/user_inputs");

const SupplyRecord = require("../services/database/SupplyRecord");
const Storage = require("../services/database/Storage");
const Supplier = require("../services/database/Supplier");

exports.addSupplyRecord = async(req, res , next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  // const validation_result = validator.supplyrecord_insert(req);

  // if(validation_result.status){
  //   return res.status(401).json({
  //     message: validation_result.message,
  //   });
  // }

  console.log(req.body)
  let result_supplier = await Supplier.findById(req.body.sup_ID);

  if(!result_supplier.status){
    return res.status(500).json({
      message: "Supplier Find Failed",
    });
  }

  if(result_supplier.values.length < 1){
    return res.status(400).json({
      message: "Supplier not found",
    });
  }

  let result_type = await Storage.findByType(req.body.type);

  if(!result_type.status){
    return res.status(500).json({
      message: "Storage type Find Failed",
    });
  }

  if(result_type.values.length > 0){
    req.body.stock_amount = result_type.values[0].stock_amount + req.body.amount;
    let result_supplyrecord = await SupplyRecord.insertRecordWithExistType(req);

    if(!result_supplyrecord.status){
      return res.status(500).json({
        message: "Insertion Failed",
      });
    }

    return res.status(201).json({
      message: "Insertion Success!",
    });

  }else {
    return res.status(400).json({
      message: "Type not exist",
    });
  }

};

exports.getSupplyRecordBySupID = async(req, res) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  let result_supplier = await Supplier.findById(req.params.supId);

  if(!result_supplier.status){
    return res.status(500).json({
      message: "Supplier Find Failed",
    });
  }

  if(result_supplier.values.length < 1){
    return res.status(400).json({
      message: "Supplier not found",
    });
  }

  let result_supplyrecord = await SupplyRecord.findBySupplierId(req.params.supId);

  if(!result_supplyrecord.status){
    return res.status(500).json({
      message: "Supply record Find Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: result_supplyrecord.values
  });

};

exports.getSupplyRecords = async(req, res) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  let result_supplyrecord = await SupplyRecord.findAll();

  if(!result_supplyrecord.status){
    return res.status(500).json({
      message: "Supply record Find Failed",
    });
  }

  return res.status(201).json({
    message: "Search Success!",
    data: result_supplyrecord.values
  });
};

exports.deleteSupplyRecordrByID = async(req, res) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }

  let result_supplyrecord = await SupplyRecord.findById(req.params.id);

  if(!result_supplyrecord.status){
    return res.status(500).json({
      message: "Supply record Find Failed",
    });
  }

  if(result_supplyrecord.values.length < 1){
    return res.status(400).json({
      message: "Supply record not found",
    });
  }

  let result_type = await Storage.findByType(req.body.type);

  if(!result_type.status){
    return res.status(500).json({
      message: "Storage type Find Failed",
    });
  }

  if(result_type.values.length < 1){
    return res.status(400).json({
      message: "Storage type not found",
    });
  }

  rq.body.stock_amount = result_type.values[0].stock_amount - result_supplyrecord.values[0].amount;

  let result_delete = await SupplyRecord.deleteRecord(req);

  if(!result_delete.status){
    return res.status(500).json({
      message: "Deletion Failed",
    });
  }

  return res.status(201).json({
    message: "Deletion Success!",
  });

};

exports.editSupplyRecord = async(req, res) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }


  //const validation_result = validator.supplyrecord_update(req);

  // if(validation_result.status){
  //   return res.status(401).json({
  //     message: validation_result.message,
  //   });
  // }

  let result_supplyrecord = await SupplyRecord.findById(req.params.id);

  if(!result_supplyrecord.status){
    return res.status(500).json({
      message: "Supply record Find Failed",
    });
  }
  if(result_supplyrecord.values.length < 1){
    return res.status(400).json({
      message: "Supply record not found",
    });
  }

  req.body.id = req.params.id;

  let result_supplier = await Supplier.findById(req.body.supplier_id);

  if(!result_supplier.status){
    return res.status(500).json({
      message: "Supplier Find Failed",
    });
  }

  if(result_supplier.values.length < 1){
    return res.status(400).json({
      message: "Supplier not found",
    });
  }

  let result_type = await Storage.findByType(req.body.type);

  if(!result_type.status){
    return res.status(500).json({
      message: "Storage type Find Failed",
    });
  }

  if(result_type.values.length > 0){
    req.body.stock_amount = result_type.values[0].stock_amount + req.body.amount - result_supplyrecord.values[0].amount;
    let result_update = await SupplyRecord.updateRecordWithExistType(req);

    if(!result_update.status){
      return res.status(500).json({
        message: "Update Failed",
      });
    }

    return res.status(201).json({
      message: "Update Success!",
    });

  }else {
    return res.status(400).json({
      message: "Type not exist",
    });
  }
};
