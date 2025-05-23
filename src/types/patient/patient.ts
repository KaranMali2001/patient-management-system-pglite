import type { PatientFormValues } from "./patient-form-type";

export type Patient = PatientFormValues & {
  id: string;
  createdAt: Date;
};
