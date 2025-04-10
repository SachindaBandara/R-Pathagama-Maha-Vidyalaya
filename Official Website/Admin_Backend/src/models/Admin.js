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
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to enforce maximum of 3 admins
adminSchema.pre("save", async function (next) {
  const admin = this;

  // Only check limit for new documents (not updates)
  if (admin.isNew) {
    try {
      const adminCount = await mongoose.model("Admin").countDocuments();
      if (adminCount >= 3) {
        throw new Error("Maximum limit of 3 admins reached. Cannot add more admins.");
      }
      next();
    } catch (error) {
      next(error); // Pass the error to the next middleware or save operation
    }
  } else {
    next(); // Skip for updates to existing admins
  }
});

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