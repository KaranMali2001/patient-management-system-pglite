import { PGliteWorker } from "@electric-sql/pglite/worker";

export async function deletePatient(database: PGliteWorker, patientId: number) {
  const result = await database.query(`DELETE FROM patients WHERE id = $1`, [
    patientId,
  ]);
  return result;
}
