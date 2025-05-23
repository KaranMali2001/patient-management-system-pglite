import { PGliteWorker } from "@electric-sql/pglite/worker";
import { initSchema } from "./init-schema";

let db: PGliteWorker | null = null;

export const initDatabase = async (): Promise<PGliteWorker> => {
  if (!db) {
    try {
      const workerInstance = new Worker(
        new URL("/pglite-worker.js", import.meta.url),
        {
          type: "module",
        }
      );
      db = new PGliteWorker(workerInstance);
      await initSchema(db);
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }
  return db;
};
