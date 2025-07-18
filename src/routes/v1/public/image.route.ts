import { publicControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

// router.get("/", publicControllers.image.getAllImages);
router.get("/:id", publicControllers.image.getImageById);
// router.post("/batch", publicControllers.image.getImagesByIds);
router.get("/product/:id", publicControllers.image.getImagesByProductId);

export default router; 