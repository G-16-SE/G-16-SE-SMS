const validator = require('validator');

exports.manager_signup = (req, res, next) => {
    try {
        const {
            email,
            password,
            repassword,
            name,
            contactno,
            joineddate
        } = req.body

        if(validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(name) || validator.isEmpty(contactno) ||      validator.isEmpty(joineddate)){
            return res.status(400).json({
                message: "Input can't be empty"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Invalid Email Format"
            }) 
        }
        if(password !== repassword){
            return res.status(400).json({
                message: "Passwords not matching"
            })
        }
        if(!validator.isAlpha(name)){
            return res.status(400).json({
                message: "Name only needs alpha characters"
            })
        }
        if(!validator.isLength(password , {min:6})){
            return res.status(400).json({
                message: "Password must be at least 6 letters"
            })
        }
        if(!validator.isNumeric(contactno) && !validator.isLength(password , {min:10 , max:10})){
            return res.status(400).json({
                message: "Invalid Contact Number"
            })
        }
        if(!validator.isDate(joineddate)){
            return res.status(400).json({
                message: "Invalid Date"
            })
        }
        

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Input validation failed',
            error: error
        });
    }
};

exports.login = (req, res, next) => {
    try {
        const {
            email,
            password,
        } = req.body

        if(validator.isEmpty(email) || validator.isEmpty(password)){
            return res.status(400).json({
                message: "Input can't be empty"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Invalid Email Format"
            }) 
        }
        if(!validator.isLength(password , {min:6})){
            return res.status(400).json({
                message: "Password must be at least 6 letters"
            })
        }
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Input validation failed',
            error: error
        });
    }
};