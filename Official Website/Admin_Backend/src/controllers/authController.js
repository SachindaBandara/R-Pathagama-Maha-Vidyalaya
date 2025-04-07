const express = require("express");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { signUpValidation } = require("../utils/validation");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  try {
    // Run validation (ensure it returns an error if something is missing)
    signUpValidation(req);

    const { username, email, password } = req.body;
    // Encrypt password
    const hashPassword = await bcrypt.hash(password, 8);

    // Create new Admin user
    const admin = new Admin({
      username,
      email,
      password: hashPassword,
    });

    await admin.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(400).json({ error: err.message || "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await admin.validatePassword(password);

    if (isPasswordValid) {
      const token = await admin.getJWT();
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
      });
      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credintials");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfully!");
};

// Create transporter with nodemailer using Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Forgot password endpoint using async/await
exports.forgotPassword = async (req, res) => {
  const { adminNumber } = req.body;

  if (!adminNumber) {
    return res.status(400).json({ message: "Admin number is required" });
  }

  try {
    // Find admin by admin number
    const admin = await Admin.findOne({ adminNumber });
    if (!admin) {
      return res.status(404).json({ message: "Admin number not found" });
    }

    // Prepare mail options (note: this sends the stored password, which is hashed)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Password Recovery",
      text: `Your password is: ${admin.password}`,
    };

    // Use promise-based sendMail
    await transporter.sendMail(mailOptions);

    // If the email is sent successfully, respond with success
    res.status(200).json({ message: "Password sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Error sending email: " + error.message });
  }
};
