import { PatientFormValues } from "@/types/patient/patient-form-type";
import { initDatabase } from "../DatabaseService";

export const registerPatient = async (patientData: PatientFormValues) => {
  const database = await initDatabase();
  const { firstName, lastName, dateOfBirth, gender, email, phone, address } =
    patientData;

  const result = await database.query(
    `INSERT INTO patients 
        (first_name, last_name, date_of_birth, gender, email, phone, address) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
    [
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email || null,
      phone || null,
      address || null,
    ]
  );

  return result.rows?.[0];
};
