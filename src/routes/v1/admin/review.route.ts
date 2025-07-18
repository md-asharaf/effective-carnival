import { adminControllers } from "@/controllers/v1";
import { Router } from "express";

const router = Router();

router.get("/", adminControllers.review.getAllReviews);
router.get("/:id", adminControllers.review.getReviewById);
router.delete("/:id", adminControllers.review.deleteReview);

export default router; 