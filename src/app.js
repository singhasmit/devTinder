const express = require('express');

const app= express(); //calling funcn and storing in app.

app.get("/", (req, res)=>{
    res.send("HELLO from the Dashboard💸💸💸");
});

app.get("/hello", (req, res)=>{
    res.send("HELLO guys😂");
});

app.get("/user", (req, res)=>{
    res.send({
        "First Name":"Asmit",
        "Last Name" :"Singh"
    });
});

app.listen(3000, ()=>{
    console.log("Server is successfully running on port 3000");
});