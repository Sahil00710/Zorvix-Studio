import { getClientIp } from "../../config/security.js";
import {
  getInquiryById,
  listInquiries,
  softDeleteInquiry,
  updateInquiryStatus,
} from "./inquiry.service.js";
import { sendSuccess } from "../../utils/response.js";
import { writeAuditLog } from "../../utils/auditLog.js";

export async function getAllInquiries(req, res) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const status = typeof req.query.status === "string" ? req.query.status : "";
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

  const data = await listInquiries({ page, limit, status, search });

  return sendSuccess(res, "Inquiries fetched successfully", data);
}

export async function getSingleInquiry(req, res) {
  const inquiry = await getInquiryById(Number(req.params.id));

  await writeAuditLog({
    adminId: req.admin.id,
    action: "inquiry_viewed",
    ipAddress: getClientIp(req),
    userAgent: req.get("user-agent") || null,
    metadata: { inquiryId: inquiry.id },
  });

  return sendSuccess(res, "Inquiry fetched successfully", inquiry);
}

export async function patchInquiryStatus(req, res) {
  const inquiryId = Number(req.params.id);
  const { status } = req.validated.body;

  await updateInquiryStatus(inquiryId, status);

  await writeAuditLog({
    adminId: req.admin.id,
    action: "inquiry_status_updated",
    ipAddress: getClientIp(req),
    userAgent: req.get("user-agent") || null,
    metadata: { inquiryId, status },
  });

  return sendSuccess(res, "Inquiry status updated");
}

export async function archiveInquiry(req, res) {
  const inquiryId = Number(req.params.id);
  await softDeleteInquiry(inquiryId);

  await writeAuditLog({
    adminId: req.admin.id,
    action: "inquiry_deleted",
    ipAddress: getClientIp(req),
    userAgent: req.get("user-agent") || null,
    metadata: { inquiryId },
  });

  return sendSuccess(res, "Inquiry archived successfully");
}
