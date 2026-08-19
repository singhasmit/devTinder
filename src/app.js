const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth.js");

require("./config/dns.js");
require("./config/database.js");

app.use(express.json()); //middleware given by express for json
app.use(cookieParser()); //middleware by express for cookies

app.post("/signup", async (req, res) => {
  try {
    //1. validate signup dATA
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password:

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save(); //.save returns promise, therefore we need to make our funcn async
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPassowrdValid = await user.validatePassword(password);

    if (isPassowrdValid) {
      //create a jwt token
      //add the token to cookie and send the res back to user along with cookie

      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token);

      res.send("Login SuccessFul...");
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    
    const user = req.user;
    console.log("Logged in user is : " + user.firstName + " " + user.lastName);

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// Feed api = GET/feed - get all users from database
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users present");
    } else {
      res.send(users);
    }
  } catch (err) {
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
