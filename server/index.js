const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ── Routes ──
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// ── Health check ──
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "VivekPlastic server is running!" });
});

// ── MongoDB Connection ──
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vivekplastic";

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
