const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //1. validate signup dATA
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;

    //encrypt the password:

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about,
      skills,
    });

    const savedUser = await user.save(); //.save returns promise, therefore we need to make our funcn async
    const token = await savedUser.getJWT();
    //console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.send(user);

    res.json({ message: "user added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not registered. Please SignUp");
    }
    const firstName = user.firstName;

    const isPassowrdValid = await user.validatePassword(password);

    if (isPassowrdValid) {
      //create a jwt token
      //add the token to cookie and send the res back to user along with cookie

      const token = await user.getJWT();
      //console.log(token);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      res.send(user);
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("You are logged out now");
});

module.exports = authRouter;
