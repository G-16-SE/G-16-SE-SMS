const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const validator = require("../validation/user_inputs");

const User = require("../services/database/User");
const Manager = require("../services/database/Manager");

exports.manager_signup = async (req, res, next) => {

  if(req.role !== "Admin"){
    return res.status(401).json({
      message: "Access Denied"
    })
  }

  const validation_result = validator.manager_signup(req);

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

  if (result_email.values.length < 1) {
    req.body.password = "123456789";
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else {
        try {
          user_id = generateUniqueID();
          req.body.user_id = user_id;
          req.body.hashPassword = hash;
          req.body.role = "Manager";
          let insert_result = await Manager.insertRecord(req);
          if (insert_result.status) {
            return res.status(201).json({
              message: "Insertion Success!",
            });
          } else {
            return res.status(500).json({
              message: "Insertion Failed",
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
    return res.status(500).json({
      message: "Email already exist",
    });
  }
};

exports.admin_signup = async (req, res, next) => {


  const validation_result = validator.admin_signup(req);

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

  if (result_email.values.length < 1) {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      } else {
        try {
          const user_id = generateUniqueID();
          req.body.user_id = user_id;
          req.body.hashPassword = hash;
          req.body.role = "Admin";
          let insert_result = await User.insertRecord(req);
          if (insert_result.status) {
            return res.status(201).json({
              message: "Insertion Success!",
            });
          } else {
            return res.status(500).json({
              message: "Insertion Failed",
            });
          }
        } catch (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
      }
    });
  } else {
    return res.status(500).json({
      message: "Email already exist",
    });
  }
};

exports.user_login = async (req, res, next) => {
  const validation_result = validator.login(req);

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

  if (result_email.values.length > 0) {
    user = result_email.values[0];
    bcrypt.compare(req.body.password, user.password, async (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      if (result) {
        const accesstoken = jwt.sign(
          {
            email: user.email,
            userId: user.id,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "30s", // 30s
          }
        );

        const refreshtoekn = jwt.sign(
          {
            email: user.email,
            userId: user.id,
            role: user.role,
          },
          process.env.REFRESH_TOKEN_KEY,
          {
            expiresIn: "6h", // 6 hours
          }
        );

        let refreshtokenbuff = new Buffer.from(refreshtoekn, "utf8");
        let encodetoken = refreshtokenbuff.toString("base64");

        let result_token = await User.updateToken(user.id, encodetoken);

        if (result_token.status) {
          res.cookie("accesstoken", accesstoken, {
            maxAge: 900000,
            httpOnly: true,
          });
          res.cookie("refreshtoken", refreshtoekn, {
            maxAge: 900000,
            httpOnly: true,
          });

          return res.status(200).json({
            message: "Login successful",
            accesstoken: accesstoken,
          });
        } else {
          return res.status(401).json({
            message: "token update error",
          });
        }
      }
      return res.status(401).json({
        message: "Password is not matching",
      });
    });
  } else {
    return res.status(500).json({
      message: "User not exist",
    });
  }
};

exports.manager_delete = async (req, res, next) => {

  if(req.role !== "Admin"){
    return res.status(401).json({
      message: "Access Denied"
    })
  }

  const id = req.params.id;

  let result_manager = await Manager.findById(id);

  if (result_manager.status) {
    if (result_manager.values.length > 0) {
      let result_delete = await User.deleteRecord(
        result_manager.values[0].user_id
      );

      if (result_delete.status) {
        return res.status(201).json({
          message: "Deletion Success!",
        });
      } else {
        return res.status(502).json({
          message: "DB error",
        });
      }
    } else {
      return res.status(401).json({
        message: "Manager not found",
      });
    }
  } else {
    return res.status(502).json({
      message: "Manager find failed",
    });
  }
};

exports.managers_delete = async (req, res, next) => {

  if(req.role !== "Admin"){
    return res.status(401).json({
      message: "Access Denied"
    })
  }

  if(req.body.selectedrows){
    req.body.selectedrows.forEach( async (row)=> {
      let result_manager = await Manager.findById(row);

      if(!result_manager.status){
        return res.status(500).json({
          message: "Search Failed for id "+ row,
        });
      }

      if(result_manager.values.length < 1){
        return res.status(400).json({
          message: "Manager not found for id "+ row,
        })
      }
  
      let result_delete = await User.deleteRecord(
        result_manager.values[0].user_id
      );

      if(!result_delete.status){
        return res.status(500).json({
          message: "Delete Failed for id "+ row,
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

exports.user_logout = (req, res, next) => {
  res.clearCookie("accesstoken");
  res.clearCookie("refreshtoken");

  return res.status(200).json({
    message: "logout success!",
  });
};

exports.get_managers = async (req, res, next) => {
  if(req.role !== "Admin"){
    return res.status(401).json({
      message: "Access Denied"
    })
  }

  let result_search = await Manager.findAll();

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

function generateUniqueID() {
  return crypto.randomBytes(8).toString("hex");
}
