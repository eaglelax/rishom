import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

// Créer le pool de connexions MySQL
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Créer l'instance Drizzle avec le schéma
export const db = drizzle(pool, { schema, mode: "default" });

// Exporter le pool pour les cas où on en a besoin directement
export { pool };
