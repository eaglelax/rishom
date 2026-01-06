import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  console.log("🚀 Démarrage de la migration...");
  console.log("📦 URL de connexion:", process.env.DATABASE_URL?.replace(/\/\/.*@/, "//***@"));

  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL!,
    multipleStatements: true,
  });

  console.log("✅ Connecté à MySQL");

  const sqlFile = path.join(__dirname, "create-tables.sql");
  const sql = fs.readFileSync(sqlFile, "utf-8");

  console.log(`📝 Exécution du script SQL...`);

  try {
    await connection.query(sql);
    console.log("✅ Script SQL exécuté avec succès!");
  } catch (error: any) {
    console.error("❌ Erreur SQL:", error.message);
    throw error;
  }

  // Vérifier les tables créées
  const [tables] = await connection.execute(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'rishom' ORDER BY table_name"
  );

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Migration terminée!`);
  console.log(`   Tables créées (${(tables as any[]).length}):`);
  (tables as any[]).forEach((t) => console.log(`   - ${t.TABLE_NAME}`));
  console.log("=".repeat(50));

  await connection.end();
}

runMigration().catch((err) => {
  console.error("❌ Erreur fatale:", err);
  process.exit(1);
});
