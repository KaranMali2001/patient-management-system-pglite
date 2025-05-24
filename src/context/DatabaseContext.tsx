import { PGliteWorker } from "@electric-sql/pglite/worker";
import React, { createContext, useContext, useEffect, useState } from "react";
import { initDatabase } from "../database/DatabaseService";

type DatabaseContextType = {
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  database: PGliteWorker | null;
};

const DatabaseContext = createContext<DatabaseContextType>({
  isLoading: true,
  isInitialized: false,
  error: null,
  database: null,
});

export const useDatabaseContext = () => useContext(DatabaseContext);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [database, setDatabase] = useState<PGliteWorker | null>(null);
  useEffect(() => {
    const initialize = async () => {
      try {
        const db = await initDatabase();
        setIsInitialized(true);
        setError(null);
        setDatabase(db);
      } catch (err) {
        console.error("Failed to initialize database:", err);
        setError(
          "Failed to initialize database. Please refresh the page and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{ isLoading, isInitialized, error, database }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
