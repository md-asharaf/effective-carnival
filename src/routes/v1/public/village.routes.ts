import { Router } from "express";
import { publicControllers } from "@/controllers/v1";

const router = Router();

// Public village routes (no authentication required)
router.get("/", publicControllers.village.getAllVillages);
router.get("/:villageId", publicControllers.village.getVillageById);

export default router; 