import { serialize, parse } from "cookie";
import { getClientIp, getSessionCookieOptions } from "../../config/security.js";
import { buildSessionCookie, getSessionCookieName } from "../../config/cookie.js";
import { loginAdmin, logoutAdmin } from "./auth.service.js";
import { sendSuccess } from "../../utils/response.js";

export async function adminLogin(req, res) {
  const { email, password } = req.validated.body;

  const result = await loginAdmin({
    email,
    password,
    ipAddress: getClientIp(req),
    userAgent: req.get("user-agent") || null,
  });

  const sessionCookie = buildSessionCookie(result.token);

  res.append(
    "Set-Cookie",
    serialize(sessionCookie.name, sessionCookie.value, sessionCookie.options),
  );

  return sendSuccess(res, "Login successful", { admin: result.admin });
}

export async function adminLogout(req, res) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const rawToken = cookies[getSessionCookieName()];

  if (rawToken) {
    await logoutAdmin({
      rawToken,
      adminId: req.admin?.id ?? null,
      ipAddress: getClientIp(req),
      userAgent: req.get("user-agent") || null,
    });
  }

  res.append(
    "Set-Cookie",
    serialize(getSessionCookieName(), "", {
      ...getSessionCookieOptions(),
      maxAge: 0,
    }),
  );

  return sendSuccess(res, "Logout successful");
}

export function adminMe(req, res) {
  return sendSuccess(res, "Authenticated", {
    admin: req.admin,
  });
}
