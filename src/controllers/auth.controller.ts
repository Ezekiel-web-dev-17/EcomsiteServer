import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import { User, UserDocSchema } from "../models/user.model";
import bcrypt from "bcrypt";
import { tokenGen } from "../helpers/tokens.helper";
import { mailSend } from "../helpers/emailSend.helper";
import { emailTemplates } from "../utils/email.templates";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";

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
        message: "All fields are required!",
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
    next(error);
  }
};

export const signIn = async (
  req: Request<{}, {}, { email: string; password: string }>,
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

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
      return sendResponse(
        res,
        401,
        {
          success: false,
          message: "Invalid Password!",
        },
        true
      );

    const tokens = { ...tokenGen(user) };

    return sendResponse(res, 201, {
      success: true,
      message: "User found successfully.",
      data: { user, tokens },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request<{}, {}, { email: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (email)
      return sendResponse(res, 400, {
        success: false,
        message: "Email field is required",
      });

    const user = await User.findOne({ email });

    if (!user)
      return sendResponse(
        res,
        400,
        {
          success: false,
          message: "No User found with this email",
        },
        true
      );

    if (!user.isVerified)
      return sendResponse(
        res,
        401,
        {
          success: false,
          message: "Cannot reset password as User is not verified.",
        },
        true
      );

    const forgotPassEmail = await mailSend(user, emailTemplates.signUp);

    if (forgotPassEmail) {
      sendResponse(res, 200, {
        success: true,
        message: "Check your email to reset your password.",
      });
    } else {
      throw new Error("Error sending Forgot Password Email.");
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request<
    {},
    {},
    { email: string; newPassword: string; resetToken: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    if (!email || !newPassword)
      return sendResponse(
        res,
        400,
        { success: false, message: "All fields are required!" },
        true
      );

    const isReset = jwt.verify(resetToken, JWT_SECRET as Secret);

    if (!resetToken || isReset.exp < Date())
      return sendResponse(
        res,
        400,
        { success: false, message: "Invalid or expired reset token provided!" },
        true
      );
  } catch (error) {
    next(error);
  }
};
