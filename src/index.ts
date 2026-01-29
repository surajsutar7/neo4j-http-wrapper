#!/usr/bin/env node

import { app } from "./server/app";
import { config } from "./config";
import { closeDriver } from "./neo4j/driver";

const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});

async function shutdown(signal: string) {
  console.log(`\n⚠️  Received ${signal}. Gracefully shutting down...`);

  server.close(async () => {
    console.log("🛑 HTTP server closed");
    await closeDriver();
    process.exit(0);
  });
}

// 🔥 Signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// 🔥 Safety net
process.on("uncaughtException", async (err) => {
  console.error("🔥 Uncaught Exception:", err);
  await closeDriver();
  process.exit(1);
});

process.on("unhandledRejection", async (reason) => {
  console.error("🔥 Unhandled Rejection:", reason);
  await closeDriver();
  process.exit(1);
});
