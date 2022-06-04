const Storage = require("../services/database/Storage");

const validator = require("../validation/user_inputs");

exports.addStorage = async(req, res , next) => {
    if(req.role !== "Manager"){
      return res.status(401).json({
        message: "Access Denied",
        access : false,
        auth : true
      })
    }
  
    const validation_result = validator.storage_insert(req);
  
    if(validation_result.status){
      return res.status(400).json({
        message: validation_result.message,
      });
    }

    let result_type = await Storage.findByType(req.body.type);

    if(!result_type.status){
        return res.status(500).json({
            message: "Type find failed",
          });
    }

    if(result_type.values.length > 0){
        return res.status(400).json({
            message: "Type already exists",
        });
    }
  
    let result_insert = await Storage.insertRecord(req);
  
    if(!result_insert.status){
      try {
        fs.unlinkSync(req.file.filename);
      } catch(err) {
        console.error(err)
      }
      return res.status(500).json({
        message: "Insertion Failed",
      });
    }
  
    return res.status(201).json({
      message: "Insertion Success!",
    });
  
};


exports.updateStorage = async(req, res , next) => {
    if(req.role !== "Manager"){
      return res.status(401).json({
        message: "Access Denied",
        access : false,
        auth : true
      })
    }
  
    const validation_result = validator.storage_update(req);
  
    if(validation_result.status){
      return res.status(400).json({
        message: validation_result.message,
      });
    }

    let result_type = await Storage.findByType(req.body.type);

    if(!result_type.status){
        return res.status(500).json({
            message: "Type find failed",
          });
    }

    if(result_type.values.length > 0 && result_type.values[0].id!=req.params.id){
        return res.status(400).json({
            message: "Type already exists",
        });
    }
  
    let result_update = await Storage.updateRecord(req);
  
    if(!result_update.status){
      return res.status(500).json({
        message: "Update Failed",
      });
    }
  
    return res.status(201).json({
      message: "Update Success!",
    });
  
};

exports.getStorage = async (req , res , next) => {
    if(req.role !== "Manager"){
      return res.status(401).json({
        message: "Access Denied",
        access : false,
        auth : true
      })
    }
  
    let result_search = await Storage.findAll();
  
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

exports.getStorageTypes = async (req , res , next) => {
    if(req.role !== "Manager"){
      return res.status(401).json({
        message: "Access Denied",
        access : false,
        auth : true
      })
    }
  
    let result_search = await Storage.findAllTypes();
  
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

