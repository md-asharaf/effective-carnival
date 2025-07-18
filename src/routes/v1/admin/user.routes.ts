import { Router } from "express";
import { adminControllers } from "@/controllers/v1";

const router = Router();

// Admin user routes (require admin authentication)
router.get("/", adminControllers.user.getAllUsers);
router.get("/by-ids", adminControllers.user.getUsersByIds);
router.get("/:userId", adminControllers.user.getUserById);
router.post("/", adminControllers.user.createUser);
router.put("/:userId", adminControllers.user.updateUser);
router.delete("/:userId", adminControllers.user.deleteUser);

export default router; 