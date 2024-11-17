import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Optional profile picture URL
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
    coursesTaught: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Only for teachers
    ],
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Only for students
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
