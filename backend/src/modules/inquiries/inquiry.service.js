import { pool } from "../../db/connection.js";
import { AppError } from "../../utils/response.js";

const ALLOWED_STATUSES = new Set(["new", "read", "replied", "archived"]);

export async function listInquiries({ page, limit, status, search }) {
  const offset = (page - 1) * limit;
  const conditions = ["deleted_at IS NULL"];
  const values = [];

  if (status) {
    conditions.push("status = ?");
    values.push(status);
  }

  if (search) {
    conditions.push("(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)");
    const wildcard = `%${search}%`;
    values.push(wildcard, wildcard, wildcard, wildcard);
  }

  const whereClause = conditions.join(" AND ");

  const [rows] = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        phone,
        subject,
        company,
        country,
        budget,
        message,
        status,
        created_at,
        updated_at
      FROM contact_inquiries
      WHERE ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset],
  );

  const [countRows] = await pool.query(
    `
      SELECT COUNT(*) AS total
      FROM contact_inquiries
      WHERE ${whereClause}
    `,
    values,
  );

  return {
    items: rows,
    pagination: {
      page,
      limit,
      total: countRows[0].total,
    },
  };
}

export async function getInquiryById(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM contact_inquiries
      WHERE id = ? AND deleted_at IS NULL
      LIMIT 1
    `,
    [id],
  );

  if (!rows[0]) {
    throw new AppError("Inquiry not found", 404);
  }

  return rows[0];
}

export async function updateInquiryStatus(id, status) {
  if (!ALLOWED_STATUSES.has(status)) {
    throw new AppError("Invalid inquiry status", 400);
  }

  const [result] = await pool.query(
    `
      UPDATE contact_inquiries
      SET status = ?
      WHERE id = ? AND deleted_at IS NULL
    `,
    [status, id],
  );

  if (result.affectedRows === 0) {
    throw new AppError("Inquiry not found", 404);
  }
}

export async function softDeleteInquiry(id) {
  const [result] = await pool.query(
    `
      UPDATE contact_inquiries
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL
    `,
    [id],
  );

  if (result.affectedRows === 0) {
    throw new AppError("Inquiry not found", 404);
  }
}
