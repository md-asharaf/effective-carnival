import { Router } from "express";
import { adminControllers } from "@/controllers/v1";

const router = Router();

// Admin room routes (require admin authentication)
router.get("/", adminControllers.room.getAllRooms);
router.get("/by-ids", adminControllers.room.getRoomsByIds);
router.get("/:roomId", adminControllers.room.getRoomById);
router.post("/", adminControllers.room.createRoom);
router.put("/:roomId", adminControllers.room.updateRoom);
router.delete("/:roomId", adminControllers.room.deleteRoom);

export default router; 