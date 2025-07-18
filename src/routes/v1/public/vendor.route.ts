import { publicControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.get("/", publicControllers.vendor.getAllVendors);
router.get("/:id", publicControllers.vendor.getVendorById);
// router.post("/batch", publicControllers.vendor.getVendorsByIds);

export default router; 