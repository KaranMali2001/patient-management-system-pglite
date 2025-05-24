import { z } from "zod";

export const patientFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  date_of_birth: z.coerce.date({
    required_error: "Date of Birth is required.",
    invalid_type_error: "Please enter a valid date.",
  }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  medical_notes: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
