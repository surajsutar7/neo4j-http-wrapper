import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { healthCheck } from "./health.controller";

export const app = express();

app.use(express.json());

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", healthCheck);

// Neo4j routes
app.use("/neo4j", routes);
