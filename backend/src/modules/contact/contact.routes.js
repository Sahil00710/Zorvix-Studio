import { Router } from "express";
import { submitContactInquiry } from "./contact.controller.js";
import { contactSchema } from "./contact.validation.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { contactLimiter } from "../../middleware/rateLimit.middleware.js";
import { requireTrustedOrigin } from "../../middleware/origin.middleware.js";

const router = Router();

router.post(
  "/contact",
  contactLimiter,
  requireTrustedOrigin,
  validateRequest(contactSchema),
  asyncHandler(submitContactInquiry),
);

export default router;
