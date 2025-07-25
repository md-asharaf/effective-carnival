import { Router } from "express";
import bookingRoutes from "./booking.routes";
import roomRoutes from "./room.routes";
import userRoutes from "./user.routes";
import reviewRoutes from "./review.route";
import vendorRoutes from "./vendor.route";
import imageRoutes from "./image.route";
import paymentRoutes from "./payment.route";

const router = Router();

// Feature-specific routes
router.use("/bookings", bookingRoutes);
router.use("/rooms", roomRoutes);
router.use("/reviews", reviewRoutes);
router.use("/vendors", vendorRoutes);
router.use("/images", imageRoutes);
router.use("/payments", paymentRoutes);
router.use("/", userRoutes);

export default router; 