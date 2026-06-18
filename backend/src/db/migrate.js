import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { env } from "../config/env.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    multipleStatements: true,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\``);
    await connection.query(`USE \`${env.DB_NAME}\``);

    const migrationPath = path.resolve(currentDir, "migrations", "001_init.sql");
    const sql = await fs.readFile(migrationPath, "utf8");

    await connection.query(sql);
    console.log(`Migrations applied successfully to database "${env.DB_NAME}".`);
  } finally {
    await connection.end();
  }
}

runMigrations().catch((error) => {
  console.error("Failed to run MySQL migrations.");
  console.error(error);
  process.exit(1);
});
