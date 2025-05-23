"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { registerPatient } from "@/database/queries/RegisterPatien";
import {
  patientFormSchema,
  PatientFormValues,
} from "@/types/patient/patient-form-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PatientRegistrationForm } from "./PatientRegistrationForm";

export default function PatientRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: undefined,
      email: "",
      phone: "",
      address: "",
      medicalNotes: "",
    },
  });

  const handleSubmit = async (values: PatientFormValues) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const patientData: PatientFormValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        email: values.email,
        phone: values.phone,
        address: values.address,
        medicalNotes: values.medicalNotes,
      };

      await registerPatient(patientData);
      toast.success("Patient has been successfully registered in the system.");
      form.reset();
    } catch (error) {
      console.error("Error registering patient:", error);
      setError("An error occurred while registering the patient.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 py-16 mb-8 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 dark:bg-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
              <Users className="h-12 w-12 text-white drop-shadow-sm" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">
            Register New Patient
          </h1>
          <p className="text-xl text-emerald-50 dark:text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Enter the patient's information to register them in our secure
            healthcare management system.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardContent className="p-8">
            {error && (
              <Alert
                variant="destructive"
                className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Patient has been successfully registered in the system.
                </AlertDescription>
              </Alert>
            )}

            <PatientRegistrationForm
              form={form}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
