const express = require("express");
const noticeController = require("../controllers/noticeController");
const { userAuth } = require("../middleware/auth");

const router = express.Router();

// Protect create, update, and delete routes
router.post("/notices",  noticeController.createNotice);
router.get("/notices", noticeController.getAllNotices); // Public route
router.put("/notices/:id",  noticeController.updateNotice);
router.delete("/notices/:id", noticeController.deleteNotice);

module.exports = router;
