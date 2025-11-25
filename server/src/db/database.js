import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;

// init database connection and run schema
export function initDatabase() {
  if (db) {
    return db;
  }

  // if (!data_directory) mkdir data_directory;
  const dbPath = path.resolve(config.database.path);
  const dbDir = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // create database connection
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL"); // write-ahead-logging for better concurrency
  db.pragma("foreign_keys = ON"); // enforce foreign keys

  // run schema file against db
  const schemaPath = path.join(__dirname, "../../data/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  db.exec(schema);

  console.log(`Database initialized at ${dbPath}`);

  return db;
}

// get database instance. the db object stays here as a singleton and we grab it only through this function.
export function getDatabase() {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return db;
}

// close database connection
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log("Database connection closed");
  }
}

export default {
  initDatabase,
  getDatabase,
  closeDatabase,
};
