import { Router } from "express";
import { publicControllers } from "@/controllers/v1";

const router = Router();

// Public booking routes
router.get("/", publicControllers.booking.getAllBookings);
router.get("/:id", publicControllers.booking.getBookingById);

export default router; 