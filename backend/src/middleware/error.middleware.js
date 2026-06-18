import { AppError } from "../utils/response.js";

export function errorMiddleware(error, _req, res, _next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details ? { errors: error.details } : {}),
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
}
