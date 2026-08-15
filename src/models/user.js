const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required : true,
    },
    lastName : {
        type:String
    },
    emailId : {
        type:String,
        required : true,
        lowercase : true,
        unique :true,
    },
    password : {
        type:String,
        required : true,
    },
    age : {
        type:Number,
    },
    gender: {
        type:String,
        validate(value){
        if(!["males", "female", "others"].includes(value)){
            throw new Error("Invalid Gender");
        }
        }
    },
    photoUrl :{
        type: String,
        default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ElnqybKu82MrfBK-dIy15kpM1zATiw9ytB8esiA8LGCGoX5dnFns7KzA&s=10",
    },
    about:{
        type :String,
        default :"This is a default user",
    },
    skills :{
        type : [String],
    },
    
}, 

{timestamps: true
}
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;