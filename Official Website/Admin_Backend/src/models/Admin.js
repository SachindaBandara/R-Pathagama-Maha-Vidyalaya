const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Try to enter strong password: " + value);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.getJWT = async function () {
  const admin = this;
  // Create JWT token for each user
  const token = await jwt.sign({ _id: admin._id }, "Sachinda@19", {
    expiresIn: "7d",
  });
  return token;
};

adminSchema.methods.validatePassword = async function (inputPassword) {
  const admin = this;
  const hashPassword = admin.password;

  // get the user's password and compare hashed and entered password
  const isPasswordValid = await bcrypt.compare(inputPassword, hashPassword);

  return isPasswordValid;
};

module.exports = mongoose.model("Admin", adminSchema);
