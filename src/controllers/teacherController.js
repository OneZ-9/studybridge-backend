import { z } from "zod";
import { Teacher } from "../models/Teacher.js";

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: teachers.length,
      data: { teachers },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

export const getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { teacher },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

export const createTeacher = async (req, res, next) => {
  try {
    const newTeacher = z
      .object({
        name: z
          .string()
          .trim()
          .min(1, "Name is required")
          .max(100, "Name must not exceed 100 characters"), // Optional max length for name
        email: z.string().email("Invalid email format"), // Ensures a valid email address
        password: z
          .string()
          .min(6, "Password must be at least 6 characters")
          .max(128, "Password must not exceed 128 characters"), // Common password constraints
        profilePicture: z
          .string()
          .url("Invalid URL format") // Ensures the string is a valid URL
          .optional(), // Optional field
        coursesTaught: z
          .array(
            z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid course ID format") // Ensures valid MongoDB ObjectId
          )
          .optional(), // Optional array of courses
      })
      .safeParse(req.body);

    if (!newTeacher.success) {
      return res.status(400).json({ errors: newTeacher.error.errors });
    }

    // Create a new Teacher
    const createdTeacher = await Teacher.create(newTeacher.data);
    res.status(201).json({ status: "success", data: createdTeacher });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};
