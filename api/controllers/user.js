const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Manager = require("../models/Manager");

exports.manager_signup = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                role: req.body.role
              });
              user
                .save()
                .then(result_user => {
                  console.log("User created");
                  const manager = new Manager(
                      {
                        _id: new mongoose.Types.ObjectId(),
                        user_id: result_user._id,
                        name: req.body.name,
                        contact: req.body.contactno,
                        join_date: req.body.joineddate
                      }
                  );
                  manager
                  .save()
                  .then(result_manager => {
                    console.log("Manager created");
                    res.status(201).json({
                        message: "Insertion Success!"
                    });

                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  })
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
};

exports.admin_signup = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                role: req.body.role
              });
              user
                .save()
                .then(result_user => {
                  console.log("User created");
                  res.status(201).json({
                    message: "Insertion Success!"
                });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "User not exist!"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].role
              },
              process.env.JWT_KEY,
              {
                expiresIn: '2h' // 2hrs
              }
            );
            //res.cookie("jwt", token, { maxAge: 900000, httpOnly: true });
            return res.status(200).json({
              message: "Login successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Password is not matching"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};
