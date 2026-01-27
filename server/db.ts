import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

// Créer le pool de connexions MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "rishom",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Créer l'instance Drizzle avec le schéma
export const db = drizzle(pool, { schema, mode: "default" });

// Exporter le pool pour les cas où on en a besoin directement
export { pool };
