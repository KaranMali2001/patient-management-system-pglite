import { Button } from "@/components/ui/button";
import { Patient } from "@/types/patient/patient";
import { CalendarDays, Mail, MapPin, Phone, User, X } from "lucide-react";

export const PatientDetailsDialog = ({
  patient,
  isOpen,
  onClose,
}: {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !patient) return null;

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <Button
        className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-2">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Patient Details
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-2">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {patient.first_name} {patient.last_name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  Patient ID
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  #{patient.id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  Gender
                </label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                    {patient.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 dark:bg-teal-900/30 rounded-xl p-2">
                <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2 mt-1">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Email Address
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {patient.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2 mt-1">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Phone Number
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {patient.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Address
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {patient.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-2">
                <CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Medical Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2 mt-1">
                  <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Date of Birth
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {formatDate(patient.date_of_birth)}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Medical History
                </label>
                <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {patient.medical_notes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  Created
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {formatDate(patient.createdat)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  Last Updated
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {formatDate(patient.updatedat)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
