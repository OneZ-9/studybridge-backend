import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

// import { studentRoutes } from "./src/routes/studentRoutes.js";
// import { teacherRoutes } from "./src/routes/teacherRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { courseRoutes } from "./src/routes/courseRoutes.js";

import AppError from "./src/utils/appError.js";
import globalErrorHandler from "./src/controllers/errorController.js";

export const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// DB Connection
connectDB();

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);
