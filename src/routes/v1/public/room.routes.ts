import { Router } from "express";
import { publicControllers } from "@/controllers/v1";

const router = Router();

// Public room routes (no authentication required)
router.get("/", publicControllers.room.getAllRooms);
router.get("/by-ids", publicControllers.room.getRoomsByIds);
router.get("/:roomId", publicControllers.room.getRoomById);

export default router; 