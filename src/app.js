const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

require("./config/dns.js");
require("./config/database.js");

app.use(express.json()); //middleware given by express for json

app.post("/signup", async(req, res) => {
  
  const user = new User(req.body);

  try{
    await user.save(); //.save returns promise, therefore we need to make our funcn async
  res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("Error while saving");
  }
  
});

// Feed api = GET/feed - get all users from database
app.get("/user", async(req, res)=>{
  try{
      const user = await( User.find({emailId : req.body.emailId}));
      if(user.length===0){
        res.status(404).send("User Not Found")
      }else{
        res.send(user);
      }
      
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async(req, res)=>{
  try{
      const users = await(User.find({}))
      if(users.length===0){
        res.status(404).send("No users present")
      }else{
        res.send(users);
      }
  }
  catch(err){
    res.status(400).send("Something went wrong");
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
