import bcrypt from "bcryptjs";
import { pool } from "../../db/connection.js";
import { AppError } from "../../utils/response.js";
import { generateSessionToken, getSessionExpiryDate, hashSessionToken } from "../../utils/session.js";
import { writeAuditLog } from "../../utils/auditLog.js";

export async function loginAdmin({ email, password, ipAddress, userAgent }) {
  const [rows] = await pool.query(
    "SELECT id, name, email, password_hash, is_active FROM admin_users WHERE email = ? LIMIT 1",
    [email],
  );

  const admin = rows[0];

  if (!admin || !admin.is_active) {
    await writeAuditLog({
      action: "admin_login_failed",
      ipAddress,
      userAgent,
      metadata: { email },
    });
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, admin.password_hash);

  if (!passwordMatches) {
    await writeAuditLog({
      adminId: admin.id,
      action: "admin_login_failed",
      ipAddress,
      userAgent,
      metadata: { email },
    });
    throw new AppError("Invalid email or password", 401);
  }

  const rawToken = generateSessionToken();
  const tokenHash = hashSessionToken(rawToken);
  const expiresAt = getSessionExpiryDate();

  await pool.query(
    `
      INSERT INTO admin_sessions (admin_id, session_token_hash, expires_at)
      VALUES (?, ?, ?)
    `,
    [admin.id, tokenHash, expiresAt],
  );

  await writeAuditLog({
    adminId: admin.id,
    action: "admin_login_success",
    ipAddress,
    userAgent,
  });

  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
    token: rawToken,
    expiresAt,
  };
}

export async function logoutAdmin({ rawToken, adminId, ipAddress, userAgent }) {
  const tokenHash = hashSessionToken(rawToken);

  await pool.query("DELETE FROM admin_sessions WHERE session_token_hash = ?", [tokenHash]);

  await writeAuditLog({
    adminId,
    action: "admin_logout",
    ipAddress,
    userAgent,
  });
}
