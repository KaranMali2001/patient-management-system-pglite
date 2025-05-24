import { Patient } from "@/types/patient/patient";
import { PGliteWorker } from "@electric-sql/pglite/worker";

export const getPatient = async (database: PGliteWorker | null) => {
  const result = await database?.query(`SELECT * FROM patients`);
  return result?.rows as Patient[];
};
