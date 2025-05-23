import { Pill } from "lucide-react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ui/theme-toggle";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Register Patients", to: "/register-patient" },
    { name: "View Records", to: "/view-records" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2 z-10">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MediLite
            </span>
          </Link>

          {/* Center: Nav Links (Absolute Centered) */}
          <div className="absolute inset-x-0 flex justify-center">
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Theme Toggle */}
          <div className="absolute right-4 bg-white dark:bg-gray-900 rounded-md shadow-md p-1 z-10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
