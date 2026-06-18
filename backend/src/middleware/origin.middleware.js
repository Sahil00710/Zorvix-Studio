import { isAllowedOrigin } from "../config/security.js";
import { AppError } from "../utils/response.js";

export function requireTrustedOrigin(req, _res, next) {
  const origin = req.get("origin");

  if (!origin) {
    return next();
  }

  if (!isAllowedOrigin(origin)) {
    return next(new AppError("Forbidden origin", 403));
  }

  return next();
}
