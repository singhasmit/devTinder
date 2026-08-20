const validator= require("validator");

const validateSignUpData=(req)=>{
    const {firstName, lastName , emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name not valid, please enter your full name");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email Address not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }

}

const validateEditProfileData =(req)=>{
    const allowedEditFields =["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];

    //every key of req is now a filed and cheking whether every files is included
    //in out list, only those can be modified
    const isEditAllowed = Object.keys(req.body).every(field=>allowedEditFields.includes(field));
    
    return isEditAllowed;
}

module.exports={
    validateSignUpData,
    validateEditProfileData,
}