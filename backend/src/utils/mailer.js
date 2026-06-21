import { Resend } from "resend";
import { env } from "../config/env.js";

const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";
const DEFAULT_FROM_NAME = "Zorvix Studio";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEmailFrom() {
  const fromEmail = env.EMAIL_FROM || DEFAULT_FROM_EMAIL;
  const fromName = env.EMAIL_FROM_NAME?.trim() || DEFAULT_FROM_NAME;

  return `${fromName} <${fromEmail}>`;
}

function isResendTestingRecipientError(error) {
  return (
    error?.statusCode === 403 &&
    error?.name === "validation_error" &&
    String(error?.message || "").includes("You can only send testing emails")
  );
}

function buildMessageText(inquiry) {
  return [
    `Name: ${inquiry.name || "Unknown"}`,
    `Email: ${inquiry.email || "No email"}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Subject: ${inquiry.subject || "Not provided"}`,
    `Country: ${inquiry.country || "Not provided"}`,
    `Budget: ${inquiry.budget || "Not provided"}`,
    "",
    "Message:",
    inquiry.message || "No message",
  ].join("\n");
}

function buildMessageHtml(inquiry) {
  return `
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name || "Unknown")}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email || "No email")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone || "Not provided")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(inquiry.subject || "Not provided")}</p>
    <p><strong>Country:</strong> ${escapeHtml(inquiry.country || "Not provided")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(inquiry.budget || "Not provided")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(inquiry.message || "No message").replaceAll("\n", "<br />")}</p>
  `;
}

export async function sendContactNotification(inquiry) {
  if (!env.RESEND_API_KEY) {
    console.warn("Email skipped: RESEND_API_KEY is missing.");
    return;
  }

  if (!env.CONTACT_NOTIFY_EMAIL) {
    console.warn("Email skipped: CONTACT_NOTIFY_EMAIL is missing.");
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: getEmailFrom(),
    to: [env.CONTACT_NOTIFY_EMAIL],
    replyTo: inquiry.email,
    subject: "New contact inquiry - Zorvix Studio",
    text: buildMessageText(inquiry),
    html: buildMessageHtml(inquiry),
  });

  if (error) {
    if (isResendTestingRecipientError(error)) {
      console.warn(
        [
          "Contact email skipped: Resend testing sender can only email the Resend account owner.",
          "Fix Render CONTACT_NOTIFY_EMAIL to match the Resend account email, or verify a domain in Resend and set EMAIL_FROM to that domain email.",
        ].join(" "),
      );
      return;
    }

    throw error;
  }

  console.log("Contact inquiry notification email sent:", data?.id);
}
