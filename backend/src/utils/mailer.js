import nodemailer from "nodemailer";
import { Resend } from "resend";
import { env } from "../config/env.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEmailFrom() {
  const fromEmail = env.EMAIL_FROM ?? env.SMTP_FROM_EMAIL ?? env.SMTP_USER;
  const fromName = env.EMAIL_FROM_NAME?.trim();

  if (!fromEmail) {
    return null;
  }

  return fromName ? `${fromName} <${fromEmail}>` : fromEmail;
}

function hasResendConfig() {
  return Boolean(env.RESEND_API_KEY && getEmailFrom() && env.CONTACT_NOTIFY_EMAIL);
}

function hasSmtpConfig() {
  return Boolean(
    env.SMTP_HOST &&
      env.SMTP_PORT &&
      env.SMTP_USER &&
      env.SMTP_PASS &&
      getEmailFrom() &&
      env.CONTACT_NOTIFY_EMAIL,
  );
}

function createSmtpTransporter() {
  if (!hasSmtpConfig()) {
    return null;
  }

  const port = Number(env.SMTP_PORT);
  const secure = Boolean(env.SMTP_SECURE);

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 300000,
  });
}

function buildMessageText(inquiry) {
  return [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Subject: ${inquiry.subject || "Not provided"}`,
    `Country: ${inquiry.country || "Not provided"}`,
    `Budget: ${inquiry.budget || "Not provided"}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

function buildMessageHtml(inquiry) {
  return `
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone || "Not provided")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(inquiry.subject || "Not provided")}</p>
    <p><strong>Country:</strong> ${escapeHtml(inquiry.country || "Not provided")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(inquiry.budget || "Not provided")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(inquiry.message).replaceAll("\n", "<br />")}</p>
  `;
}

async function sendWithResend(inquiry) {
  const from = getEmailFrom();

  if (!env.RESEND_API_KEY || !from || !env.CONTACT_NOTIFY_EMAIL) {
    return false;
  }

  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from,
    to: env.CONTACT_NOTIFY_EMAIL,
    subject: `New contact inquiry from ${inquiry.name}`,
    text: buildMessageText(inquiry),
    html: buildMessageHtml(inquiry),
  });

  return true;
}

async function sendWithSmtp(inquiry) {
  const transporter = createSmtpTransporter();
  const from = getEmailFrom();

  if (!transporter || !from || !env.CONTACT_NOTIFY_EMAIL) {
    return false;
  }

  await transporter.sendMail({
    from,
    to: env.CONTACT_NOTIFY_EMAIL,
    subject: `New contact inquiry from ${inquiry.name}`,
    text: buildMessageText(inquiry),
    html: buildMessageHtml(inquiry),
  });

  return true;
}

export async function sendContactNotification(inquiry) {
  if (hasResendConfig()) {
    await sendWithResend(inquiry);
    return;
  }

  if (hasSmtpConfig()) {
    await sendWithSmtp(inquiry);
    return;
  }

  console.warn(
    "Contact inquiry email notification skipped because neither Resend nor SMTP is fully configured.",
  );
}
