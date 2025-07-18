import { Router } from "express";
import { userControllers } from "@/controllers/v1";

const router = Router();

// User profile routes (require user authentication)
router.get("/profile", userControllers.user.getCurrentUser);
router.put("/profile", userControllers.user.updateCurrentUser);
router.delete("/profile", userControllers.user.deleteCurrentUser);

// User routes (require user authentication)
router.get("/users/:userId", userControllers.user.getUserById);

export default router; 