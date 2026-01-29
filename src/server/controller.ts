import { Request, Response } from "express";
import { runQuery } from "../neo4j/executor";

/**
 * @openapi
 * /neo4j/query:
 *   post:
 *     summary: Execute a Cypher query
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 example: MATCH (n) RETURN n LIMIT 5
 *               params:
 *                 type: object
 *                 example: {}
 *     responses:
 *       200:
 *         description: Query executed successfully
 *       401:
 *         description: Unauthorized
 */

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
