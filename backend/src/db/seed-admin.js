import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { pool } from "./connection.js";

async function seedAdmin() {
  const [existing] = await pool.query("SELECT id FROM admin_users WHERE email = ? LIMIT 1", [
    env.ADMIN_SEED_EMAIL,
  ]);

  if (existing.length > 0) {
    console.log(`Admin user already exists for ${env.ADMIN_SEED_EMAIL}.`);
    return;
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_SEED_PASSWORD, 12);

  await pool.query(
    `
      INSERT INTO admin_users (name, email, password_hash)
      VALUES (?, ?, ?)
    `,
    [env.ADMIN_SEED_NAME, env.ADMIN_SEED_EMAIL, passwordHash],
  );

  console.log(`Seeded admin user ${env.ADMIN_SEED_EMAIL}.`);
}

seedAdmin()
  .catch((error) => {
    console.error("Failed to seed admin user.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
