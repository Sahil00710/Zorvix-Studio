import { isAllowedOrigin } from "./security.js";

export const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin ?? "unknown origin"}`));
  },
  credentials: true,
};
