const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getAllAdmins,
  deleteAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/admins", getAllAdmins);
router.delete("/admins/:id" , deleteAdmin);

module.exports = router;
