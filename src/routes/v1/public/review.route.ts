import { Router } from "express";
import { publicControllers } from "@/controllers/v1";

const router = Router();

// Public review routes
router.get("/", publicControllers.review.getAllReviews);
router.get("/:id", publicControllers.review.getReviewById);
// router.post("/batch", publicControllers.review.getReviewsByIds);

export default router; 