const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const validator = require("../validation/user_inputs");

const User = require("../services/database/User");
const Manager = require("../services/database/Manager");

exports.manager_update = async (req, res, next) => {

  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied",
      access : false,
      auth : true
    })
  }
  
  // const validation_result = validator.manager_update(req);

  // if (validation_result.status) {
  //   return res.status(400).json({
  //     message: validation_result.message,
  //   });
  // }

  let result_email = await User.findByEmail(req.body.email);

  if (!result_email.status) {
    return res.status(502).json({
      message: "Email find failed",
    });
  }

  let result_manager = await Manager.findById(req.body.id);

  if (!result_manager.status) {
    return res.status(502).json({
      message: "Manager find failed",
    });
  }

  if(result_manager.values.length < 1){
    return res.status(400).json({
      message: "Manager not exist",
    });
  }

  const email_condition =
    (result_email.values.length > 0 &&
      result_manager.values[0].email == req.body.email) ||
    result_email.values.length < 1;

  console.log(result_email.values, result_manager.values,
      req.body.email, email_condition)

  if (email_condition) {
    if (req.body.password && req.body.password != "") {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        } else {
          try {
            req.body.user_id = result_manager.values[0].user_id;
            req.body.hashPassword = hash;
            let update_result = await Manager.updateRecord(req);
            if (update_result.status) {
              return res.status(201).json({
                message: "Updation Success!",
              });
            } else {
              return res.status(500).json({
                message: "Updation Failed",
              });
            }
          } catch (err) {
            return res.status(500).json({
              message: err,
            });
          }
        }
      });
    } else {
      try {
        req.body.user_id = result_manager.values[0].user_id;
        if(!req.body.password) req.body.password = "";
        let update_result = await Manager.updateRecord(req);
        if (update_result.status) {
          return res.status(201).json({
            message: "Updation Success!",
          });
        } else {
          return res.status(500).json({
            message: "Updation Failed",
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: err,
        });
      }
    }
  } else {
    return res.status(400).json({
      message: "Email already exist",
    });
  }
};

exports.get_manager = async (req, res, next) => {
  if(req.role !== "Manager"){
    return res.status(401).json({
      message: "Access Denied"
    })
  }
  let result_search = await Manager.findByUserId(req.user_id);

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
