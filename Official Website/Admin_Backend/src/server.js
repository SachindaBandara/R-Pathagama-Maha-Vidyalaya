const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");

const noticeRoutes = require("./routes/noticeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require('./routes/authRoutes');

require("dotenv").config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Admin frontend (with credentials)
  'http://localhost:5174'  // Main public website frontend (no credentials)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or if origin is in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json()); // Convert JSON into JavaScript Object
app.use(cookieParser());

// Routes
app.use("/api", noticeRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/auth', authRoutes);

// Connect to mongooDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Check the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

