import { Router } from "express";
import { publicControllers } from "@/controllers/v1";

const router = Router();

// Public user routes
router.get("/", publicControllers.user.getAllUsers);
router.get("/:id", publicControllers.user.getUserById);
router.post("/batch", publicControllers.user.getUsersByIds);

export default router; 