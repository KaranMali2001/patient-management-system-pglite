import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDatabaseContext } from "@/context/DatabaseContext";
import { getPatientCount } from "@/database/queries/getPatientCount";
import { FileText, Shield, Stethoscope, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [patientCount, setPatientCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { database } = useDatabaseContext();

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const count = await getPatientCount(database);

        setPatientCount(count.count); // Fixed: Pass the count value
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching patient count:", error);
        setPatientCount(0);
        setIsLoading(false);
      }
    };

    if (database) {
      fetchPatientCount();
    }
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPatientCount();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [database]); // Added database as dependency

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 shadow-xl">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-sm">
              Welcome to{" "}
              <span className="text-emerald-200 dark:text-emerald-300">
                MediLite
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-emerald-50 dark:text-emerald-100 max-w-4xl mx-auto leading-relaxed">
              Streamline your healthcare management with our comprehensive
              patient registration and medical record system.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-slate-100 dark:text-emerald-700 dark:hover:bg-white shadow-xl text-lg px-8 py-4"
              >
                <Link to="/register-patient">
                  <Users className="mr-3 h-6 w-6" />
                  Register New Patient
                </Link>
              </Button>

              {/* Patient Count Button */}
              <Button
                asChild
                size="lg"
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm text-white hover:bg-white/30 dark:hover:bg-black/30 border-2 border-white/30 shadow-xl text-lg px-8 py-4"
              >
                <Link to="/view-records">
                  <FileText className="mr-3 h-6 w-6" />
                  {isLoading
                    ? "Loading..."
                    : `View Records (${patientCount ?? 0})`}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Comprehensive Healthcare Management
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need to manage patient information efficiently and
              securely with modern technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-200">
                  Patient Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 dark:text-slate-400 leading-relaxed">
                  Quick and easy patient registration with comprehensive
                  information collection and validation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <FileText className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-200">
                  Medical Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 dark:text-slate-400 leading-relaxed">
                  Secure storage and easy access to patient medical history and
                  treatment records.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <Shield className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-200">
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 dark:text-slate-400 leading-relaxed">
                  HIPAA-compliant security measures to protect sensitive patient
                  information.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon Container */}
          <div className="inline-block p-6 mb-8 rounded-3xl shadow-lg bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30">
            <Stethoscope className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Ready to Get Started?
          </h2>

          {/* Description */}
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of healthcare providers who trust MediLite for their
            patient management needs.
          </p>

          {/* Call to Action Button */}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white shadow-xl text-lg px-8 py-4 rounded-xl transition duration-200"
          >
            <Link to="/register-patient">Start Registering Patients</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
