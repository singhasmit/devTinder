const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

require("./config/dns.js");
require("./config/database.js");

app.post("/signup", async(req, res) => {
  const user = new User({
    firstName: "Asmit",
    lastName: "Singh",
    emailId: "asmit123@gmail.com",
    password: "asmit123",
  });

  try{
    await user.save(); //.save returns promise, therefore we need to make our funcn async
  res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("Error while saving");
  }
  
});

connectDB()
  .then(() => {
    console.log("Database Conncection Established");
    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Database couldnot be connected");
  });
