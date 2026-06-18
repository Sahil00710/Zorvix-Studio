import { getClientIp } from "../../config/security.js";
import { createContactInquiry } from "./contact.service.js";
import { sendSuccess } from "../../utils/response.js";
import { sendContactNotification } from "../../utils/mailer.js";

export async function submitContactInquiry(req, res) {
  const data = req.validated.body;

  if (data.company) {
    return sendSuccess(res, "Your inquiry has been submitted successfully.");
  }

  await createContactInquiry({
    ...data,
    ipAddress: getClientIp(req),
    userAgent: req.get("user-agent") || null,
  });

  try {
    await sendContactNotification(data);
  } catch (error) {
    console.error("Failed to send contact inquiry notification email.", error);
  }

  return sendSuccess(res, "Your inquiry has been submitted successfully.");
}
