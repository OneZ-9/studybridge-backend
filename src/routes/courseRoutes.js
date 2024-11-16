import express from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
} from "../controllers/courseController.js";

export const courseRoutes = express.Router();

courseRoutes.route("/").get(getAllCourses).post(createCourse);

courseRoutes.route("/:courseId").get(getCourse);
