import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-emerald-600 dark:text-emerald-400">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
