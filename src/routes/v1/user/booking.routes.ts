import { Router } from "express";
import { userControllers } from "@/controllers/v1";

const router = Router();

// User booking routes (require user authentication)
router.post("/", userControllers.booking.createBooking);
router.post("/with-verification", userControllers.booking.createBookingWithVerification);
router.get("/", userControllers.booking.getUserBookings);
router.get("/:bookingId", userControllers.booking.getBookingById);
router.put("/:bookingId", userControllers.booking.updateBooking);
router.delete("/:bookingId", userControllers.booking.cancelBooking);

// Verification routes
router.post("/:bookingId/verify", userControllers.booking.verifyBooking);
router.post("/:bookingId/confirm", userControllers.booking.confirmBooking);
router.get("/:bookingId/verification-status", userControllers.booking.getBookingVerificationStatus);

export default router; 