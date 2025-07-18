import { Router } from "express";
import { userControllers } from "@/controllers/v1";

const router = Router();

// User review routes (authenticated)
router.get("/my", userControllers.review.getMyReviews);
router.post("/", userControllers.review.createReview);
router.patch("/:id", userControllers.review.updateReview);
router.delete("/:id", userControllers.review.deleteReview);

export default router; 