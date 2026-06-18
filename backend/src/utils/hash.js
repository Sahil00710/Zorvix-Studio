import crypto from "node:crypto";
import { env } from "../config/env.js";

export function createSha256Hmac(value) {
  return crypto.createHmac("sha256", env.SESSION_SECRET).update(value).digest("hex");
}
