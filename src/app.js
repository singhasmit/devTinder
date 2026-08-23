require("./config/dns.js");
require("./config/database.js");

const express = require("express");
const connectDB = require("./config/database.js");
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); //middleware given by express for json
app.use(cookieParser()); //middleware by express for cookies

// Feed api = GET/feed - get all users from database

const authRouter= require("./routes/auth.js");
const profileRouter= require("./routes/profile.js");
const requestRouter= require("./routes/request.js");
const userRouter= require("./routes/user.js")

//giving the path to each api so that it can find the exact matching route
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);



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
