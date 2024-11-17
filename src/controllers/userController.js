import { z } from "zod";
import { User } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const newUser = z
      .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.enum(["teacher", "student"], "Role is required"),
        profilePicture: z.string().optional(), // Optional field
      })
      .safeParse(req.body);

    if (!newUser.success) {
      return res.status(400).json({ errors: newUser.error.errors });
    }

    const createdUser = await User.create(newUser.data);
    res.status(201).json({ status: "success", data: createdUser });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = z
      .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        profilePicture: z.string().optional(), // Optional field
      })
      .safeParse(req.body);

    if (!user.success) {
      return res.status(400).json({ errors: user.error.errors });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      user.data,
      { new: true, runValidators: true }
    );
    res.status(201).json({ status: "success", data: { user: updatedUser } });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    next(error);
  }
};
