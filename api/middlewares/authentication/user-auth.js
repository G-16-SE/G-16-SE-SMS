const jwt = require('jsonwebtoken');
const User = require("../../services/database/User");

module.exports = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const accesstoken = req.cookies.accesstoken;
        const refreshtoken = req.cookies.refreshtoken;

        if(accesstoken){
            jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY , (err , decodedaccesstoken) => {
                if(err){

                    if(refreshtoken){

                        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY , async(err , decodedrefreshtoken) => {
                            if(err){
                                console.error(err.message);
                                return res.status(401).json({
                                    message: 'Auth failed'
                                });
                            }else {
                                let result_user = await User.findById(decodedrefreshtoken.userId);
                                if(result_user.status){
                                    if(result_user.values.length > 0 && result_user.values[0].token){
                                        const savedrefreshtoken = new Buffer(result_user.values[0].token, 'base64').toString('ascii');
                                        if(savedrefreshtoken == refreshtoken){

                                            const user = result_user.values[0];

                                            const newaccesstoken = jwt.sign(
                                                {
                                                  email: user.email,
                                                  userId: user.id,
                                                  role: user.role
                                                },
                                                process.env.ACCESS_TOKEN_KEY,
                                                {
                                                  expiresIn: '30s' // 30s
                                                }
                                              );
                                    
                                              const newrefreshtoekn = jwt.sign(
                                                {
                                                  email: user.email,
                                                  userId: user.id,
                                                  role: user.role
                                                },
                                                process.env.ACCESS_TOKEN_KEY,
                                                {
                                                  expiresIn: '6h' // 6 hours
                                                }
                                              );
                                    
                                              let refreshtokenbuff = new Buffer(newrefreshtoekn);
                                              let encodetoken = refreshtokenbuff.toString('base64');
                                    
                                              let result_token = await User.updateToken(user.id , encodetoken);

                                              if(result_token.status){

                                                res.cookie("accesstoken", newaccesstoken, { maxAge: 900000, httpOnly: true });
                                                res.cookie("refreshtoken", newrefreshtoekn, { maxAge: 900000, httpOnly: true });

                                                next();
                                    
                                              }else {
                                                return res.status(401).json({
                                                  message: "token update error"
                                              });
                                    
                                              }

                                        }else {
                                            return res.status(401).json({
                                                message: 'User not found'
                                            });
                                        }
                                    }else{
                                        return res.status(401).json({
                                            message: 'User not found'
                                        });
                                    }
                                    
                                }else {
                                    return res.status(502).json({
                                        message: 'DB error'
                                    });
                                }
                                

                            }
                        });
                    }else {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    
                }else {
                    req.user = decodedaccesstoken;
                    next();
                }
            });
        }else {
            if(refreshtoken){

                jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY , async(err , decodedrefreshtoken) => {
                    if(err){
                        console.error(err.message);
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }else {
                        let result_user = await User.findById(decodedrefreshtoken.userId);
                        if(result_user.status){
                            if(result_user.values.length > 0 && result_user.values[0].token){
                                const savedrefreshtoken = new Buffer(result_user.values[0].token, 'base64').toString('ascii');
                                if(savedrefreshtoken == refreshtoken){

                                    const user = result_user.values[0];

                                    const newaccesstoken = jwt.sign(
                                        {
                                          email: user.email,
                                          userId: user.id,
                                          role: user.role
                                        },
                                        process.env.ACCESS_TOKEN_KEY,
                                        {
                                          expiresIn: '30s' // 30s
                                        }
                                      );
                            
                                      const newrefreshtoekn = jwt.sign(
                                        {
                                          email: user.email,
                                          userId: user.id,
                                          role: user.role
                                        },
                                        process.env.ACCESS_TOKEN_KEY,
                                        {
                                          expiresIn: '6h' // 6 hours
                                        }
                                      );
                            
                                      let refreshtokenbuff = new Buffer(newrefreshtoekn);
                                      let decodetoken = refreshtokenbuff.toString('base64');
                            
                                      let result_token = await User.updateToken(user.id , decodetoken);

                                      if(result_token.status){

                                        res.cookie("accesstoken", newaccesstoken, { maxAge: 900000, httpOnly: true });
                                        res.cookie("refreshtoken", newrefreshtoekn, { maxAge: 900000, httpOnly: true });

                                        next();
                            
                                      }else {
                                        return res.status(401).json({
                                          message: "token update error"
                                      });
                            
                                      }

                                }else {
                                    return res.status(401).json({
                                        message: 'User not found'
                                    });
                                }
                            }else{
                                return res.status(401).json({
                                    message: 'User not found'
                                });
                            }
                            
                        }else {
                            return res.status(502).json({
                                message: 'DB error'
                            });
                        }
                        

                    }
                });
            }else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        }
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};