import { Request, Response } from "express";
import { getDriver } from "../neo4j/driver";

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Checks server and Neo4j connectivity
 *     responses:
 *       200:
 *         description: Service is healthy
 *       503:
 *         description: Neo4j is unavailable
 */
export async function healthCheck(req: Request, res: Response) {
  try {
    // Lightweight Neo4j connectivity check
    const driver = getDriver();
    await driver.verifyConnectivity();

    res.json({
      status: "ok",
      neo4j: "connected",
      uptime: process.uptime()
    });
  } catch (err: any) {
    res.status(503).json({
      status: "error",
      neo4j: "disconnected",
      message: err.message
    });
  }
}
