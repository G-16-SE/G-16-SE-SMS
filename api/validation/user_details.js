const validator = require('validator');

exports.manager_signup = (req) => {

    result = {
        message: "",
        status: false
    }
    
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
            result.message = "Input can't be empty";
            result.status = true;
            return result;
        }
        if(!validator.isEmail(email)){

            result.message = "Invalid Email Format";
            result.status = true;
            return result;
        }
        if(password !== repassword){
            result.message =  "Passwords not matching";
            result.status = true;
            return result;
        
        }
        if(!validator.isAlpha(name)){
            result.message =  "Name only needs alpha characters";
            result.status = true;
            return result;
            
        }
        if(!validator.isLength(password , {min:6})){
            result.message = "Password must be at least 6 letters";
            result.status = true;
            return result;
            
        }
        if(!validator.isNumeric(contactno) && !validator.isLength(password , {min:10 , max:10})){
            result.message = "Invalid Contact Number";
            result.status = true;
            return result;
            
        }
        if(!validator.isDate(joineddate)){
            result.message = "Invalid Date";
            result.status = true;
            return result;
           
        }
        
    } catch (error) {
        result.message ='Input validation failed';
        result.status = true;
        return result;
        
    }
};

exports.manager_update = (req) => {

    result = {
        message: "",
        status: false
    }
    
    try {
        const {
            email,
            password,
            repassword,
            name,
            contactno,
            joineddate
        } = req.body

        if(validator.isEmpty(email) || validator.isEmpty(name) || validator.isEmpty(contactno) ||  validator.isEmpty(joineddate)){
            result.message = "Input can't be empty";
            result.status = true;
            return result;
        }
        if(!validator.isEmail(email)){

            result.message = "Invalid Email Format";
            result.status = true;
            return result;
        }
        if(password !== repassword){
            result.message =  "Passwords not matching";
            result.status = true;
            return result;
        
        }
        if(!validator.isAlpha(name)){
            result.message =  "Name only needs alpha characters";
            result.status = true;
            return result;
            
        }
        if(!validator.isLength(password , {min:6})){
            result.message = "Password must be at least 6 letters";
            result.status = true;
            return result;
            
        }
        if(!validator.isNumeric(contactno) && !validator.isLength(password , {min:10 , max:10})){
            result.message = "Invalid Contact Number";
            result.status = true;
            return result;
            
        }
        if(!validator.isDate(joineddate)){
            result.message = "Invalid Date";
            result.status = true;
            return result;
           
        }
        
    } catch (error) {
        result.message ='Input validation failed';
        result.status = true;
        return result;
        
    }
};

exports.admin_signup = (req) => {

    result = {
        message: "",
        status: false
    }
    
    try {
        const {
            email,
            password,
            repassword
        } = req.body

        if(validator.isEmpty(email) || validator.isEmpty(password)){
            result.message = "Input can't be empty";
            result.status = true;
            return result;
        }
        if(!validator.isEmail(email)){

            result.message = "Invalid Email Format";
            result.status = true;
            return result;
        }
        if(password !== repassword){
            result.message =  "Passwords not matching";
            result.status = true;
            return result;
        
        }
        if(!validator.isLength(password , {min:6})){
            result.message = "Password must be at least 6 letters";
            result.status = true;
            return result;
            
        }
        
    } catch (error) {
        result.message ='Input validation failed';
        result.status = true;
        return result;
        
    }

    return result;
};

exports.login = (req) => {

    result = {
        message: "",
        status: false
    }

    try {
        const {
            email,
            password,
        } = req.body

        if(validator.isEmpty(email) || validator.isEmpty(password)){
            result.message ="Input can't be empty";
            result.status = true;
            return result;
            
        }
        if(!validator.isEmail(email)){
            result.message ="Invalid Email Format";
            result.status = true;
            return result;
            
        }
        if(!validator.isLength(password , {min:6})){
            result.message = "Password must be at least 6 letters";
            result.status = true;
            return result;
            
        }
    } catch (error) {
        console.log(error.message)
        result.message ='Input validation failed';
        result.status = true;
        return result;
        
    }

    return result;
};