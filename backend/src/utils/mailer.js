import nodemailer from "nodemailer";
import { env } from "../config/env.js";

function hasMailConfig() {
  return Boolean(
    env.SMTP_HOST &&
      env.SMTP_PORT &&
      env.SMTP_USER &&
      env.SMTP_PASS &&
      (env.CONTACT_NOTIFY_EMAIL || env.SMTP_FROM_EMAIL),
  );
}

function createTransporter() {
  if (!hasMailConfig()) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE ?? false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

export async function sendContactNotification(inquiry) {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      "Contact inquiry email notification skipped because SMTP is not configured in backend/.env.",
    );
    return;
  }

  const to = env.CONTACT_NOTIFY_EMAIL ?? env.SMTP_FROM_EMAIL;
  const from = env.SMTP_FROM_EMAIL ?? env.SMTP_USER;

  await transporter.sendMail({
    from,
    to,
    subject: `New contact inquiry from ${inquiry.name}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone || "Not provided"}`,
      `Subject: ${inquiry.subject || "Not provided"}`,
      `Country: ${inquiry.country || "Not provided"}`,
      `Budget: ${inquiry.budget || "Not provided"}`,
      "",
      "Message:",
      inquiry.message,
    ].join("\n"),
  });
}
