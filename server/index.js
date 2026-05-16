import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://lexmind-beryl.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("LexMind API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
