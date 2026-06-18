import { Router } from "express";
import { adminLogin, adminLogout, adminMe } from "./auth.controller.js";
import { adminLoginSchema } from "./auth.validation.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { adminLoginLimiter } from "../../middleware/rateLimit.middleware.js";
import { requireAdminAuth } from "../../middleware/auth.middleware.js";
import { requireTrustedOrigin } from "../../middleware/origin.middleware.js";

const router = Router();

router.post(
  "/admin/login",
  adminLoginLimiter,
  requireTrustedOrigin,
  validateRequest(adminLoginSchema),
  asyncHandler(adminLogin),
);

router.post(
  "/admin/logout",
  requireTrustedOrigin,
  asyncHandler(requireAdminAuth),
  asyncHandler(adminLogout),
);

router.get("/admin/me", asyncHandler(requireAdminAuth), adminMe);

export default router;
