import { pool } from "../../db/connection.js";

export async function createContactInquiry({
  name,
  email,
  phone,
  subject,
  message,
  company,
  country,
  budget,
  ipAddress,
  userAgent,
}) {
  const [result] = await pool.query(
    `
      INSERT INTO contact_inquiries (
        name,
        email,
        phone,
        subject,
        message,
        company,
        country,
        budget,
        ip_address,
        user_agent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [name, email, phone || null, subject || null, message, company || null, country || null, budget || null, ipAddress, userAgent],
  );

  return result.insertId;
}
