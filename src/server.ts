import express from "express";
import dotenv from "dotenv";
import connectDB  from "./config/database";
import userRoutes from "./routes/userRoutes";

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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));