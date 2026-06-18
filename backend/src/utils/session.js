import { env } from "../config/env.js";
import { SESSION_TTL_MS } from "../config/security.js";
import { createSha256Hmac } from "./hash.js";

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashSessionToken(token) {
  return createSha256Hmac(token);
}

export function getSessionExpiryDate() {
  return new Date(Date.now() + SESSION_TTL_MS);
}
