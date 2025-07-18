import { Router } from "express";
import { adminControllers } from "@/controllers/v1";

const router = Router();

// Admin booking routes (require admin authentication)
router.get("/", adminControllers.booking.getAllBookings);
router.get("/:bookingId", adminControllers.booking.getBookingById);
router.patch("/:bookingId/status", adminControllers.booking.updateBookingStatus);
router.get("/room/:roomId", adminControllers.booking.getRoomBookings);
router.get("/user/:userId", adminControllers.booking.getUserBookings);
router.get("/availability/:roomId", adminControllers.booking.checkRoomAvailability);

export default router; 