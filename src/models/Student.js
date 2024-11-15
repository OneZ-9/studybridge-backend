import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Optional profile picture URL
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // References courses
    ],
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
