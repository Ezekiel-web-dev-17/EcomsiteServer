import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.config";

if (!DB_URI)
  throw new Error(`DB_URI is not defined in ${NODE_ENV} environment variables`);

export const dbConnect = async () => {
  try {
    console.log("Connecting to Database...");
    if (DB_URI) {
      await mongoose.connect(DB_URI);
      console.log("Server connected Database successfully!");
    }
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
