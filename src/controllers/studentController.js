import { z } from "zod";
import { Student } from "../models/Student.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: students.length,
      data: { students },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { student },
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const newStudent = z
      .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        profilePicture: z.string().optional(), // Optional field
      })
      .safeParse(req.body);

    if (!newStudent.success) {
      return res.status(400).json({ errors: newStudent.error.errors });
    }
    const createdStudent = await Student.create(newStudent.data);
    res.status(201).json({ status: "success", data: null });
  } catch (error) {
    // next(error);
    res.status(400).json({ status: "fail", message: error });
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = z
      .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        profilePicture: z.string().optional(), // Optional field
      })
      .safeParse(req.body);

    if (!student.success) {
      return res.status(400).json({ errors: student.error.errors });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      student.data,
      { new: true, runValidators: true }
    );
    res
      .status(201)
      .json({ status: "success", data: { student: updatedStudent } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error });
  }
};
