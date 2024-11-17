import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

export const userRoutes = express.Router();

userRoutes.route("/").get(getAllUsers).post(registerUser);

userRoutes.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);
