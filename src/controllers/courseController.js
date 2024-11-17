import { z } from "zod";
import { Course } from "../models/Course.js";

export const getAllCourses = async (req, res, next) => {
  try {
    // const courses = await Course.find().populate("teacher").exec();
    const courses = await Course.find().populate({
      path: "teacher",
      select: "name",
    });

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: courses.length,
      data: { courses },
    });
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    // const courses = await Course.find().populate("teacher").exec();
    const course = await Course.findById(req.params.courseId).populate({
      path: "teacher",
      select: "name",
    });

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const newCourse = z
      .object({
        title: z
          .string()
          .trim()
          .min(1, "Title is required")
          .max(100, "Title must not exceed 100 characters"), // Optional max length
        description: z
          .string()
          .trim()
          .max(500, "Description must not exceed 500 characters")
          .optional(), // Optional field
        teacher: z
          .string()
          .regex(/^[a-fA-F0-9]{24}$/, "Invalid teacher ID format"), // Ensures it's a valid MongoDB ObjectId
      })
      .safeParse(req.body);

    if (!newCourse.success) {
      return res.status(400).json({ errors: newCourse.error.errors });
    }

    // Create a new course
    const createdCourse = await Course.create(newCourse.data);
    res.status(201).json({ status: "success", data: createdCourse });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};
