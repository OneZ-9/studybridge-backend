import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGODB_URI, MONGODB_PASSWORD } = process.env;

    if (!MONGODB_URI || !MONGODB_PASSWORD) {
      throw new Error("Missing required environment variables");
    }

    const connectionString = MONGODB_URI.replace(
      "<PASSWORD>",
      MONGODB_PASSWORD
    );

    // if (!connectionString) {
    //   throw new Error("connectionString undefined");
    // }

    await mongoose.connect(`${connectionString}`);
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed", error);
  }
};
