const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Optional profile picture URL
    coursesTaught: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // References courses they teach
    ],
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
