import { Router } from "express";
import { adminControllers } from "@/controllers/v1";

const router = Router();

// Admin village routes (require admin authentication)
router.get("/", adminControllers.village.getAllVillages);
router.get("/:villageId", adminControllers.village.getVillageById);
router.post("/", adminControllers.village.createVillage);
router.put("/:villageId", adminControllers.village.updateVillage);
router.delete("/:villageId", adminControllers.village.deleteVillage);

export default router; 