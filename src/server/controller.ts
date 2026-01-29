import { Request, Response } from "express";
import { runQuery } from "../neo4j/executor";

export async function executeCypher(req: Request, res: Response) {
  const { query, params } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const data = await runQuery(query, params);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
