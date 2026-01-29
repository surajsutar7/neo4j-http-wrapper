import { Router } from "express";
import { executeCypher } from "./controller";

const router = Router();

router.post("/query", executeCypher);

export default router;
