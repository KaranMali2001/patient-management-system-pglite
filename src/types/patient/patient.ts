import type { PatientFormValues } from "./patient-form-type";

export type Patient = PatientFormValues & {
  id: number;
  createdat: Date;
  updatedat: Date;
};
