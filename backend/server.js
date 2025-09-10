const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // ✅ Thêm dòng này

const middleware = require("./middleware");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(middleware.cors);

// Serve Frontend Files
app.use(express.static(path.join(__dirname, "../frontend")));

// Import Routes
const subscribeRoutes = require("./routes/subscribe");
const serviceRoutes = require("./routes/services");
const newsletterRoutes = require("./routes/newsletter");
const contactRoutes = require("./routes/contact");
const blogRoutes = require("./routes/blog");

// Use Routes
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);

// Start server immediately; connect to DB with retry
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
