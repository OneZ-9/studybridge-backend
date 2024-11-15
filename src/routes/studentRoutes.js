import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateStudent,
} from "../controllers/studentController.js";

export const studentRoutes = express.Router();

studentRoutes.route("/").get(getAllStudents).post(createStudent);

studentRoutes
  .route("/:studentId")
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);
