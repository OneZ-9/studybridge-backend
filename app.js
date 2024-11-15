import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

import { studentRoutes } from "./src/routes/studentRoutes.js";

export const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

connectDB();

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
// app.use("/api/v1/students", teacherRoutes);
// app.use("/api/v1/students", courseRoutes);
