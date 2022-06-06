const jwt = require("jsonwebtoken");
const User = require("../../services/database/User");

module.exports = async (req, res, next) => {
  try {
    const accesstoken = req.cookies.accesstoken;
    const refreshtoken = req.cookies.refreshtoken;

    if (accesstoken) {
      jwt.verify(
        accesstoken,
        process.env.ACCESS_TOKEN_KEY,
        (err, decodedaccesstoken) => {
          if (err) {
            if (refreshtoken) {
              jwt.verify(
                refreshtoken,
                process.env.REFRESH_TOKEN_KEY,
                async (err, decodedrefreshtoken) => {
                  if (err) {
                    console.error(err.message , "111111111111");
                    return res.status(401).json({
                      message: "Auth failed",
                      access : false,
                      auth : false
                    })
                  } else {
                    let result_user = await User.findById(
                      decodedrefreshtoken.userId
                    );
                    if (result_user.status) {
                      if (
                        result_user.values.length > 0 &&
                        result_user.values[0].token
                      ) {
                        const savedrefreshtoken = new Buffer(
                          result_user.values[0].token,
                          "base64"
                        ).toString("ascii");
                        //const savedrefreshtoken = result_user.values[0].token;
                        if (savedrefreshtoken === req.cookies.refreshtoken) {
                          const user = result_user.values[0];

                          const newaccesstoken = jwt.sign(
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

                          const newrefreshtoekn = jwt.sign(
                            {
                              email: user.email,
                              userId: user.id,
                              role: user.role,
                            },
                            process.env.REFRESH_TOKEN_KEY,
                            {
                              expiresIn: "300000s", 
                            }
                          );

                          let refreshtokenbuff = new Buffer.from(
                            newrefreshtoekn,
                            "utf8"
                          );
                          let encodetoken = refreshtokenbuff.toString("base64");

                          let result_token = await User.updateToken(
                            user.id,
                            encodetoken
                          );

                          if (result_token.status) {
                            res.cookie("accesstoken", newaccesstoken, {
                              maxAge: 900000,
                              httpOnly: true,
                              sameSite: 'none',
                              secure: true,
                            });
                            res.cookie("refreshtoken", newrefreshtoekn, {
                              maxAge: 900000,
                              httpOnly: true,
                              sameSite: 'none',
                              secure: true,
                            });

                            req.user_id = user.id;
                            req.role = user.role;

                            next();
                          } else {
                            return res.status(500).json({
                              message: "token update error",
                            });
                          }
                        } else {
                          // console.log("222222222222")
                          return res.status(401).json({
                            message: "Auth failed",
                            access : false,
                            auth : false
                          })
                        }
                      } else {
                        // console.log("2");
                        return res.status(401).json({
                          message: "User not found",
                          access : false,
                          auth : false
                        })
                      }
                    } else {
                      return res.status(401).json({
                        message: "DB Error",
                        access : false,
                        auth : false
                      })
                    }
                  }
                }
              );
            } else {
              // console.log("33333333333")
              return res.status(401).json({
                message: "Auth failed",
                access : false,
                auth : false
              })
            }
          } else {
            
            req.user_id = decodedaccesstoken.userId;
            req.role = decodedaccesstoken.role;
            next();
          }
        }
      );
    } else {
      if (refreshtoken) {
        jwt.verify(
          refreshtoken,
          process.env.REFRESH_TOKEN_KEY,
          async (err, decodedrefreshtoken) => {
            if (err) {
              console.error(err.message);
              return res.status(401).json({
                message: "Auth failed",
                access : false,
                auth : false
              })
            } else {
              let result_user = await User.findById(decodedrefreshtoken.userId);
              if (result_user.status) {
                if (
                  result_user.values.length > 0 &&
                  result_user.values[0].token
                ) {
                  const savedrefreshtoken = new Buffer(
                    result_user.values[0].token,
                    "base64"
                  ).toString("ascii");
                  //const savedrefreshtoken = result_user.values[0].token;
                  if (savedrefreshtoken === req.cookies.refreshtoken) {
                    const user = result_user.values[0];

                    const newaccesstoken = jwt.sign(
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

                    const newrefreshtoekn = jwt.sign(
                      {
                        email: user.email,
                        userId: user.id,
                        role: user.role,
                      },
                      process.env.REFRESH_TOKEN_KEY,
                      {
                        expiresIn: "300000s",
                      }
                    );

                    let refreshtokenbuff = new Buffer(newrefreshtoekn);
                    let decodetoken = refreshtokenbuff.toString("base64");

                    let result_token = await User.updateToken(
                      user.id,
                      decodetoken
                    );

                    if (result_token.status) {
                      res.cookie("accesstoken", newaccesstoken, {
                        maxAge: 900000,
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                      });
                      res.cookie("refreshtoken", newrefreshtoekn, {
                        maxAge: 900000,
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                      });

                      req.user_id = user.id;
                      req.role = user.role;

                      next();
                    } else {
                      return res.status(401).json({
                        message: "token update error",
                        access : false,
                        auth : false
                      })
                    }
                  } else {
                    return res.status(401).json({
                      message: "User not found",
                      access : false,
                      auth : false
                    })
                  }
                } else {
                  return res.status(401).json({
                    message: "User not found",
                    access : false,
                    auth : false
                  })
                }
              } else {
                return res.status(401).json({
                  message: "DB error",
                  access : false,
                  auth : false
                })
              }
            }
          }
        );
      } else {
        // console.log("55555555555555")
        return res.status(401).json({
          message: "Auth failed",
          access : false,
          auth : false
        })
      }
    }
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      message: "Auth failed",
      access : false,
      auth : false
    })
  }
};
