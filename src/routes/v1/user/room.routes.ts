import { Router } from "express";
import { userControllers } from "@/controllers/v1";

const router = Router();

// User room routes (require user authentication)
router.post("/", userControllers.room.createRoom);
router.get("/", userControllers.room.getUserRooms);
router.get("/:roomId", userControllers.room.getUserRoomById);
router.put("/:roomId", userControllers.room.updateUserRoom);
router.delete("/:roomId", userControllers.room.deleteUserRoom);

export default router; 