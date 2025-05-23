import { PGliteWorker } from "@electric-sql/pglite/worker";

export const initSchema = async (database: PGliteWorker) => {
  await database.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          date_of_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          gender TEXT NOT NULL,
          email TEXT,
          phone TEXT,
          address TEXT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

  await database.query(`
      CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (last_name, first_name);
    `);

  console.log("Database schema initialized");
};
