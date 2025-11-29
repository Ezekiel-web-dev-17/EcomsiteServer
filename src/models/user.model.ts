import mongoose from "mongoose";

export interface UserDocSchema {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isVerified: boolean;
}

const userModel = new mongoose.Schema<UserDocSchema>(
  {
    firstname: {
      type: String,
      minlength: 2,
      required: [true, "Your first name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      minlength: 2,
      required: [true, "Your first name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Your email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocSchema>("Users", userModel);
