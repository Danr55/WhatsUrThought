import express from "express";
import dotenv from "dotenv";
import connectDB  from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import thoughtRoutes from "./routes/thoughtRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));