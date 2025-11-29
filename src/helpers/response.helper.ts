import { Response } from "express";

interface OutputBody {
  success: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
}

export const sendResponse = (
  res: Response,
  status: number,
  body: OutputBody,
  error?: unknown
) => {
  if (error || (!error && body.error)) {
    const err =
      error instanceof Error
        ? error.stack
        : JSON.stringify(error ? error : body.error);
    body["error"] = err;
    console.error(err);
  }

  return res.status(status).json(body);
};
