
const jwt = require("jsonwebtoken");
const User= require("../models/user");

const userAuth = async(req, res , next)=>{
    try{
    //read the token from req cookies
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is INVALID!!!");
    }
    //validate the token 
    const decodedObj = await jwt.verify(token , "devTinder@#123");

    const{_id} = decodedObj;

    //find the user 
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User")
    }
    req.user= user;
    next(); // next is called to move to the request handler;
}
catch(err){
    res.status(400).send("ERROR : "+ err.message);
}
}

module.exports= userAuth;

