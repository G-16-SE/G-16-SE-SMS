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
  
  const validation_result = validator.manager_update(req);

  if (validation_result.status) {
    return res.status(400).json({
      message: validation_result.message,
    });
  }

  let result_email = await User.findByEmail(req.body.email);

  if (!result_email.status) {
    return res.status(502).json({
      message: "Email find failed",
    });
  }

  const email_condition =
    (result_email.values.length > 0 &&
      result_email.values[0].email == req.body.email) ||
    result_email.values.length < 1;

  if (email_condition) {
    if (req.body.password && req.body.password != "") {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        } else {
          try {
            req.body.user_id = req.user_id;
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
        req.body.user_id = req.user_id;
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
  // if(req.role !== "Manager"){
  //   return res.status(401).json({
  //     message: "Access Denied"
  //   })
  // }

  let result_search = await Manager.findByUserId('111222111222');

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
