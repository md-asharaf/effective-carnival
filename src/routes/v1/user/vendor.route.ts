import { userControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.post("/", userControllers.vendor.createVendor);
router.patch("/:id", userControllers.vendor.updateMyVendor);
router.delete("/:id", userControllers.vendor.deleteMyVendor);

export default router; 