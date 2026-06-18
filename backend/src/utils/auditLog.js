import { pool } from "../db/connection.js";

export async function writeAuditLog({
  adminId = null,
  action,
  ipAddress = null,
  userAgent = null,
  metadata = null,
}) {
  try {
    await pool.query(
      `
        INSERT INTO audit_logs (admin_id, action, metadata, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)
      `,
      [adminId, action, metadata ? JSON.stringify(metadata) : null, ipAddress, userAgent],
    );
  } catch (error) {
    console.error("Failed to write audit log", error);
  }
}
