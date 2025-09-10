const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // ✅ Thêm dòng này

const middleware = require("./middleware");

dotenv.config();
const app = express();

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

// Database & Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("✅ Server is running on port 5000"));
  })
  .catch((err) => console.error(err));
