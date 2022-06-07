const Storage = require("../services/database/Storage");

const validator = require("../validation/user_inputs");

exports.getGoodTypes = async (req , res , next) => {
    // if(req.role !== "Manager"){
    //   return res.status(401).json({
    //     message: "Access Denied"
    //   })
    // }
  
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

exports.getgoods = async (req , res , next) => {
    // if(req.role !== "Manager"){
    //   return res.status(401).json({
    //     message: "Access Denied"
      
    //   })
    // }
  
    let result_search = await Storage.findAllGoods();
  
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