import express from "express";
import routes from "./routes";
import { healthCheck } from "./health.controller";

export const app = express();

app.use(express.json());

// ✅ Top-level health check
app.get("/health", healthCheck);

// Neo4j routes
app.use("/neo4j", routes);
