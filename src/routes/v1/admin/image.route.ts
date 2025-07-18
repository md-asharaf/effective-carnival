import { adminControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.patch("/:id", adminControllers.image.updateMyImage);
router.delete("/:id", adminControllers.image.deleteMyImage);
router.post('/', adminControllers.image.createImage)

export default router;                          