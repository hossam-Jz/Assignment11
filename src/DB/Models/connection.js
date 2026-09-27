import mongoose from "mongoose";
import { DB_URL } from "../../config/config.service.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected successfuly");
  } catch (error) {
    console.log("DB connection Failed");
  }
};
