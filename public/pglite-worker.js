import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";

worker({
  async init(options) {
    const meta = options.meta;
    console.log("Worker process started", meta);
    return new PGlite({
      dataDir: options.dataDir,
    });
  },
});
