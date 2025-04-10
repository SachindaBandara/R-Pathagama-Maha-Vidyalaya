const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { signUpValidation } = require("../utils/validation");
const emailjs = require("@emailjs/nodejs");
const crypto = require("crypto");
const validator = require("validator");

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
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    if (error.message.includes("Maximum limit of 3 admins reached")) {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error creating admin:", error);
    res
      .status(500)
      .json({ message: "Error creating admin", error: error.message });
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

// Initialize EmailJS with your credentials
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email exists in database
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

    // Save token and expiry to admin document
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = resetTokenExpiry;
    await admin.save();

    // EmailJS parameters
    const templateParams = {
      to_email: admin.email,
      user_name: admin.username,
      reset_link: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
      expiry_time: "1 hour",
    };

    // Send email using EmailJS
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );

    res.status(200).json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

// Reset Password Controller (remains largely the same)
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required" });
    }

    // Validate new password
    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ error: "Password must be strong" });
    }

    // Find admin by reset token and check expiry
    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    admin.password = hashedPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all admins (username and email only)
exports.getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins, selecting only username and email fields
    const admins = await Admin.find({}, "username email");
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admins", error: error.message });
  }
};

// Delete an admin by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    // Validation: Check if ID is provided
    if (!id) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    // Attempt to delete the admin
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: error.message });
  }
};
