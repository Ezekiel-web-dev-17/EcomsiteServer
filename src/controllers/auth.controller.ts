import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { userInfo } from "os";

interface UserInfo {
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword?: string;
  email: string;
}

export const signUp = async (
  req: Request<{}, {}, UserInfo>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmPassword)
      return sendResponse(res, 400, {
        success: false,
        message: "ALl fields are required!",
      });

    if (password !== confirmPassword)
      return sendResponse(res, 402, {
        success: false,
        message: "Password is not the same as confirm password",
      });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return sendResponse(res, 400, {
        success: false,
        message: "User already exists.",
      });

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToCreate: UserInfo = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };
    const newUser = await User.create(userToCreate);

    return sendResponse(res, 201, {
      success: true,
      message: "New user created successfully.",
      data: newUser,
    });
  } catch (error) {
    return sendResponse(
      res,
      500,
      { success: false, message: "Error signing-up user" },
      error
    );
  }
};

export const signIn = async (
  req: Request<{}, {}, UserInfo>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return sendResponse(res, 400, {
        success: false,
        message: "User email and password are required!",
      });

    const user = await User.findOne({ email, password });

    if (!user) throw new Error("User not found! Sign up please.");
    return sendResponse(res, 201, {
      success: true,
      message: "User found successfully.",
      data: user,
    });
  } catch (error) {
    return sendResponse(
      res,
      500,
      { success: false, message: "User not found! Sign up please." },
      error
    );
  }
};
