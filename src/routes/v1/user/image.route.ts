import { userControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.post("/", userControllers.image.createImage);
router.patch("/:id", userControllers.image.updateMyImage);
router.delete("/:id", userControllers.image.deleteMyImage);

export default router; 