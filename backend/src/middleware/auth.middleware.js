import { parse } from "cookie";
import { env } from "../config/env.js";
import { pool } from "../db/connection.js";
import { hashSessionToken } from "../utils/session.js";
import { AppError } from "../utils/response.js";

export async function requireAdminAuth(req, _res, next) {
  const cookieHeader = req.headers.cookie;
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const rawToken = cookies[env.ADMIN_SESSION_COOKIE];

  if (!rawToken) {
    return next(new AppError("Unauthorized", 401));
  }

  const tokenHash = hashSessionToken(rawToken);

  const [rows] = await pool.query(
    `
      SELECT
        s.id AS session_id,
        s.expires_at,
        a.id,
        a.name,
        a.email,
        a.is_active
      FROM admin_sessions s
      INNER JOIN admin_users a ON a.id = s.admin_id
      WHERE s.session_token_hash = ?
      LIMIT 1
    `,
    [tokenHash],
  );

  const session = rows[0];

  if (!session || !session.is_active || new Date(session.expires_at).getTime() <= Date.now()) {
    return next(new AppError("Unauthorized", 401));
  }

  req.admin = {
    id: session.id,
    name: session.name,
    email: session.email,
    sessionId: session.session_id,
  };

  return next();
}
