const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }
    
    req.admin = admin; // Attach authenticated admin to req.admin
    next(); // Continue execution
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { userAuth };
