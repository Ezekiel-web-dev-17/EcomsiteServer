import {
  CLIENT_URL,
  MAIL_PASS,
  MAIL_USER,
  PROJECT_NAME,
} from "../config/env.config";
import nodemailer from "nodemailer";
import { UserDocSchema } from "../models/user.model";

type contentConfig = {
  subject: string;
  text: (user: Pick<UserDocSchema, "firstname" | "email">) => string;
  html: (user: Pick<UserDocSchema, "firstname" | "email">) => string;
};

const transportFunct = function () {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  return transporter;
};

export async function mailSend(user: UserDocSchema, content: contentConfig) {
  try {
    type neededProps = Pick<UserDocSchema, "firstname" | "email">;
    const neededInUser: neededProps = user;

    const { subject, html, text } = content;
    const info = await transportFunct().sendMail({
      from: `${PROJECT_NAME} <noreply@${CLIENT_URL}>`,
      to: user.email,
      subject,
      text: text(neededInUser),
      html: html(neededInUser),
    });

    return info;
  } catch (error) {
    return error;
  }
}
