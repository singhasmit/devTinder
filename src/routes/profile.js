const express = require("express");
const profileRouter = express.Router();

const userAuth = require("../middlewares/auth.js");


profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    
    const user = req.user;
    console.log("Logged in user is : " + user.firstName + " " + user.lastName);

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports= profileRouter;