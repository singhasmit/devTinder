const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      set: (value) =>
        value
          ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
          : value,
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ElnqybKu82MrfBK-dIy15kpM1zATiw9ytB8esiA8LGCGoX5dnFns7KzA&s=10",
    },
    about: {
      type: String,
      default: "This is a default user",
    },
    skills: {
      type: [String],
    },
  },

  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devTinder@#123", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;

  const isPassowrdValid = await bcrypt.compare(password, user.password);

  return isPassowrdValid;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
