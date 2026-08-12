import express from "express";

const app= express(); //calling funcn and storing in app.

//app.get("/", (req, res)=>{
//    res.send("HELLO from the Dashboard💸💸💸");
//});
//
//app.get("/hello", (req, res)=>{
//    res.send("HELLO guys😂");
//});
//
//app.get("/user", (req, res)=>{
//    res.send({
//        "First Name":"Asmit",
//        "Last Name" :"Singh"
//    });
//});
import { adminAuth } from './middlewares/auth.js';

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next)=>{
    console.log("Getting All data");
    res.send("All data sent");
});

app.get("/admin/deleteAllUser", (req, res, next)=>{
    console.log("deleting");
    res.send("All user data deleted");
});

app.listen(3000, ()=>{
    console.log("Server is successfully running on port 3000");
});