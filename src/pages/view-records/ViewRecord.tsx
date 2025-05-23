import { Link } from "react-router-dom";

function ViewRecord() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Coming Soon
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          We're working hard to bring this feature to you.
        </p>
        <div className="flex justify-center space-x-2 animate-pulse">
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          <span className="w-3 h-3 bg-green-600 rounded-full"></span>
          <span className="w-3 h-3 bg-emerald-600 rounded-full"></span>
        </div>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md shadow hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default ViewRecord;
