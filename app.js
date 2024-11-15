import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/courses", courseRoutes);

app.get("/api/v1/students", (req, res) => {
  res.status(200).json({
    status: "success",
    //   results: students.length,
    data: { students: "students" },
  });
});

app.get("/api/v1/students/:studentId", (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: "success",
    //   results: students.length,
    data: { students: "students" },
  });
});

app.post("/api/v1/students", (req, res) => {
  console.log(req.body);
  res.send("Done");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
