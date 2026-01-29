#!/usr/bin/env node

import { app } from "./server/app";
import { config } from "./config";
import { closeDriver } from "./neo4j/driver";

const server = app.listen(config.port, () => {
  console.log(`🚀 Neo4j Wrapper running on port ${config.port}`);
});

async function shutdown(signal: string) {
  console.log(`\n⚠️  Received ${signal}. Shutting down...`);
  server.close(async () => {
    await closeDriver();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", async (err) => {
  console.error("🔥 Uncaught Exception", err);
  await closeDriver();
  process.exit(1);
});
