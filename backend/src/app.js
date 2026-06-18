import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoutes from "./modules/contact/contact.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import inquiryRoutes from "./modules/inquiries/inquiry.routes.js";
import { getSecurityHeaders } from "./config/security.js";
import { corsOptions } from "./config/cors.js";
import { generalApiLimiter } from "./middleware/rateLimit.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(generalApiLimiter);

  app.use((req, res, next) => {
    const headers = getSecurityHeaders();
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }
    next();
  });

  app.get("/health", (_req, res) => {
    res.json({ success: true, message: "Backend healthy" });
  });

  app.use("/api", contactRoutes);
  app.use("/api", authRoutes);
  app.use("/api", inquiryRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
