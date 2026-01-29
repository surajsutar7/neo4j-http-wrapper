import { Request, Response } from "express";
import { getDriver } from "../neo4j/driver";

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
