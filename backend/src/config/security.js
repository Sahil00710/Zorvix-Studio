import { env } from "./env.js";

export const SESSION_TTL_MS = env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
const configuredOrigins = [
  env.FRONTEND_URL,
  ...(env.FRONTEND_URLS
    ? env.FRONTEND_URLS.split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : []),
];

export const ALLOWED_ORIGINS = Array.from(new Set(configuredOrigins));

export function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (ALLOWED_ORIGINS.includes(origin)) {
    return true;
  }
  return false;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

export function getTrustedOrigin(request) {
  const origin = request.get("origin");
  return origin && isAllowedOrigin(origin) ? origin : null;
}

export function getClientIp(request) {
  const forwardedFor = request.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.ip || request.socket?.remoteAddress || "unknown";
}

export function getSecurityHeaders() {
  return {
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  };
}
