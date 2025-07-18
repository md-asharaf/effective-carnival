import { adminControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.get("/", adminControllers.vendor.getAllVendors);
router.get("/:id", adminControllers.vendor.getVendorById);
router.patch("/:id", adminControllers.vendor.updateVendor);
router.delete("/:id", adminControllers.vendor.deleteVendor);

export default router; 