import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../helpers/response.helper";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";
import { User, UserDocSchema } from "../models/user.model";

interface AuthRequest extends Request {
  user?: UserDocSchema;
}

const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw new Error("Access token required!");

    const decode = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;

    const user = await User.findById(decode.userId);

    if (!user)
      return sendResponse(res, 401, {
        success: false,
        message: "Invalid token - user not found.",
        error: "Error authorizing user: Invalid Token",
      });

    req.user = user;

    return next();
  } catch (error) {
    return sendResponse(
      res,
      400,
      {
        success: false,
        message: "No access token provided or user not found",
      },
      error
    );
  }
};

export default authorize;
