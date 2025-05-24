import { PatientFormValues } from "@/types/patient/patient-form-type";
import { PGliteWorker } from "@electric-sql/pglite/worker";

export const registerPatient = async (
  patientData: PatientFormValues,
  database: PGliteWorker
) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone,
    address,
  } = patientData;

  const result = await database.query(
    `INSERT INTO patients 
        (first_name, last_name, date_of_birth, gender, email, phone, address) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
    [
      first_name,
      last_name,
      date_of_birth,
      gender,
      email || null,
      phone || null,
      address || null,
    ]
  );

  return result.rows?.[0];
};
