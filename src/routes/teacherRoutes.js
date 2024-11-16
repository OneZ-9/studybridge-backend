import express from "express";
import {
  getAllTeachers,
  getTeacher,
  createTeacher,
} from "../controllers/teacherController.js";

export const teacherRoutes = express.Router();

teacherRoutes.route("/").get(getAllTeachers).post(createTeacher);

teacherRoutes.route("/:teacherId").get(getTeacher);
