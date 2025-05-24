import { QueryModal } from "@/components/QueryModel";
import { useDatabaseContext } from "@/context/DatabaseContext";
import { deletePatient } from "@/database/queries/deletePatient";
import { getPatient } from "@/database/queries/getPatients";
import { Patient } from "@/types/patient/patient";
import {
  AlertTriangle,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PatientDetailsDialog } from "./PatientDetailsDialog";

export default function ViewRecord() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null); // Track which patient is being deleted
  const { database, isInitialized } = useDatabaseContext();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");

        const patients = await getPatient(database);

        setPatients(patients);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch patients"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPatients();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [database]);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRowClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const retryFetch = () => {
    window.location.reload(); // Simple retry for demo
  };

  // Add delete patient function
  const handleDeletePatient = async (
    patientId: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Prevent row click

    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient? This action cannot be undone."
    );

    if (!confirmed) return;
    if (!database) return;
    try {
      setDeleteLoading(patientId);
      await deletePatient(database, patientId);

      // Remove patient from local state
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== patientId)
      );

      // Close modal if the deleted patient was selected
      if (selectedPatient?.id === patientId) {
        closeModal();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete patient");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients?.filter(
    (patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  // Loading State
  if (loading || patients === undefined || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/20 dark:bg-white/10 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              View Patient Records
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Access and manage patient information in our secure healthcare
              management system.
            </p>

            {/* Query Button */}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading patient records...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/20 dark:bg-white/10 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              View Patient Records
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Access and manage patient information in our secure healthcare
              management system.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-500" />
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Error Loading Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={retryFetch}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/20 dark:bg-white/10 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            View Patient Records
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Access and manage patient information in our secure healthcare
            management system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                {" "}
                {/* Add 'gap-4' to give space between elements */}
                <div className="bg-teal-100 dark:bg-teal-900/30 rounded-xl p-2">
                  <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex-grow">
                  {" "}
                  {/* 'flex-grow' will make this take remaining space */}
                  Patient Records
                </h2>
                <QueryModal query="SELECT * FROM patients" />
              </div>
            </div>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No patients found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Get started by adding a new patient."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick={() => handleRowClick(patient)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 flex-shrink-0">
                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {patient.first_name} {patient.last_name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ID: #{patient.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {patient.email}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {patient.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                          {patient.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {formatDate(patient.date_of_birth)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(patient);
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors hover:underline"
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => handleDeletePatient(patient.id, e)}
                            disabled={deleteLoading === patient.id}
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleteLoading === patient.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Patient Details Modal */}
        <PatientDetailsDialog
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}
