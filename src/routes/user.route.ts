import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

export const userRouter = Router();

userRouter.post("/account/sign-up", signUp);
userRouter.post("/account/login", signIn);
