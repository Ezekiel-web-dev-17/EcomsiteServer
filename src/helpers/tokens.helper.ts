import jwt, { Secret, SignOptions } from "jsonwebtoken";
import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from "../config/env.config";
import { UserDocSchema } from "../models/user.model";

export const tokenGen = (user: UserDocSchema) => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN ? Number(JWT_EXPIRES_IN) : "5m",
  };

  const refreshOpts: SignOptions = {
    expiresIn: JWT_REFRESH_EXPIRES_IN ? Number(JWT_REFRESH_EXPIRES_IN) : "7d",
  };

  const accessToken = jwt.sign(
    {
      id: user,
      tokenVersion: user.tokenVersion + 1,
    },
    JWT_SECRET as Secret,
    options
  );

  const refreshToken = jwt.sign(
    { id: user, tokenVersion: user.tokenVersion + 1, type: "refresh" },
    JWT_REFRESH_SECRET as Secret,
    refreshOpts
  );

  return { accessToken, refreshToken };
};
