import { PGliteWorker } from "@electric-sql/pglite/worker";

export const getPatientCount = async (database: PGliteWorker | null) => {
  const result = await database?.query(`SELECT COUNT(*) FROM patients`);
  return result?.rows?.[0] as { count: number };
};
