import { Router } from "express";
import {
  archiveInquiry,
  getAllInquiries,
  getSingleInquiry,
  patchInquiryStatus,
} from "./inquiry.controller.js";
import { requireAdminAuth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireTrustedOrigin } from "../../middleware/origin.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { inquiryStatusSchema } from "./inquiry.validation.js";

const router = Router();

router.use(asyncHandler(requireAdminAuth));

router.get("/admin/inquiries", asyncHandler(getAllInquiries));
router.get("/admin/inquiries/:id", asyncHandler(getSingleInquiry));
router.patch(
  "/admin/inquiries/:id/status",
  requireTrustedOrigin,
  validateRequest(inquiryStatusSchema),
  asyncHandler(patchInquiryStatus),
);
router.delete("/admin/inquiries/:id", requireTrustedOrigin, asyncHandler(archiveInquiry));

export default router;
