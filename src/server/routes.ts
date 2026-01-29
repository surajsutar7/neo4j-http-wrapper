import { Router } from "express";
import { executeCypher } from "./controller";
import { apiKeyAuth } from "./middleware/apiKey";

const router = Router();

// 🔐 Protect all Neo4j routes
router.use(apiKeyAuth);

router.post("/query", executeCypher);

export default router;
