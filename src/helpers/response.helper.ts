import { Response } from "express";

interface OutputBody {
  success: boolean;
  message: string;
  data?: unknown;
}

export const sendResponse = (
  res: Response,
  status: number,
  body: OutputBody,
  error?: boolean | string | unknown
) => {
  if (error) {
    const err =
      error instanceof Error
        ? error.stack
        : JSON.stringify(
            typeof error === "boolean" && error ? body.message : error
          );

    console.error(`Error: `, err);
  }

  return res.status(status).json(body);
};
