dotenv.config();
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
