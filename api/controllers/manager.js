const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const validator = require("../validation/user_details");

const User = require("../services/database/User");
const Manager = require("../services/database/Manager");

exports.manager_update = async (req, res, next) => {
  validation_result = validator.manager_uodate(req);

  if (validation_result.status) {
    return res.status(401).json({
      message: validation_result.message,
    });
  }

  let result_email = await User.findByEmail(req.body.email);

  if (!result_email.status) {
    return res.status(502).json({
      message: "DB error",
    });
  }

  const email_condition =
    (result_email.values.length > 0 &&
      result_email.values[0].id == req.user.id) ||
    result_email.values.length < 1;

  if (email_condition) {
    if (req.body.password != "") {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else {
          try {
            req.body.user_id = result_email.values[0].user_id;
            req.body.hashPassword = hash;
            let insert_result = await Manager.insertRecord(req);
            if (insert_result.status) {
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
        req.body.user_id = result_email.values[0].user_id;
        req.body.user_id = user_id;
        let insert_result = await Manager.updateRecord(req);
        if (insert_result.status) {
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
    return res.status(500).json({
      message: "Email already exist",
    });
  }
};
