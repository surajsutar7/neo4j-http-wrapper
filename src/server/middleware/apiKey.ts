import { Request, Response, NextFunction } from "express";
import { config } from "../../config";

export function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If API_KEY is not set, fail fast
  if (!config.apiKey) {
    return res.status(500).json({
      success: false,
      error: {
        code: "API_KEY_NOT_CONFIGURED",
        message: "Server API key is not configured"
      }
    });
  }

  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid or missing API key"
      }
    });
  }

  next();
}
