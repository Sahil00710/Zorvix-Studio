import { env } from "./env.js";
import { getSessionCookieOptions } from "./security.js";

export function getSessionCookieName() {
  return env.ADMIN_SESSION_COOKIE;
}

export function buildSessionCookie(token) {
  return {
    name: getSessionCookieName(),
    value: token,
    options: getSessionCookieOptions(),
  };
}
