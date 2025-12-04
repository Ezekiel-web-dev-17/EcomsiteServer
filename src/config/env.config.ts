import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  NODE_ENV,
  ARCJET_KEY,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  MAIL_USER,
  MAIL_PASS,
  PROJECT_NAME,
  BASE_URL,
  CLIENT_URL,
  SUPPORT_PHONE,
  RESET_PASS_TTL,
} = process.env;
