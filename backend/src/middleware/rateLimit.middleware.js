import rateLimit from "express-rate-limit";

function buildLimiter(windowMs, max, message) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        message,
      });
    },
  });
}

export const generalApiLimiter = buildLimiter(
  15 * 60 * 1000,
  100,
  "Too many requests. Please try again later.",
);

export const contactLimiter = buildLimiter(
  15 * 60 * 1000,
  5,
  "Too many contact attempts. Please wait and try again.",
);

export const adminLoginLimiter = buildLimiter(
  15 * 60 * 1000,
  5,
  "Too many login attempts. Please wait and try again.",
);
