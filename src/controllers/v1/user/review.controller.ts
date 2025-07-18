import { QuerySchema } from "@/@types/interface";
import { ReviewUpdate, User } from "@/@types/schema";
import catchAsync from "@/handlers/async.handler";
import reviewService from "@/services/review.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get user's reviews (user authenticated)
 * GET /api/v1/user/reviews
 */
const getMyReviews = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user || {};
    if (!userId) {
        throw new APIError(400, "User ID is required");
    }
    const query = req.query;
    try {
        const { page, limit, rating, includeRelations } =
            QuerySchema.parse(query);
        const options = {
            page,
            limit,
            rating,
            includeRelations,
        };

        const result = await reviewService.getReviewsByUserId(userId, options);

        res.status(200).json({
            data: result,
            status: "success",
            message: "User reviews retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        console.error("Error retrieving user reviews:", error);
        throw new APIError(500, error.message);
    }
});

/**
 * Create a new review (user authenticated)
 * POST /api/v1/user/reviews
 */
const createReview = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User;
    const { productId, rating, comment } = req.body;
    if (!productId || !rating) {
        throw new APIError(400, "Missing required fields: productId and rating are required");
    }
    try {
        const review = await reviewService.createReview({
            productId,
            rating,
            comment,
            userId: user.id // Add userId to match the schema
        });
        res.status(201).json({
            data: { review },
            status: "success",
            message: "Review created successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Update review by ID (user authenticated)
 * PATCH /api/v1/user/reviews/:id
 */
const updateReview = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User;
    const { id: reviewId } = req.params;
    const { comment, rating } = req.body as ReviewUpdate;

    if (!reviewId) {
        throw new APIError(400, "Review ID is required");
    }
    if (!comment && !rating) {
        throw new APIError(400, "At least one field is required for update");
    }

    try {
        const updatedReview = await reviewService.updateReviewById(
            user.id,
            reviewId,
            {
                comment,
                rating,
            }
        );
        res.status(200).json({
            data: { review: updatedReview },
            status: "success",
            message: "Review updated successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Delete review by ID (user authenticated)
 * DELETE /api/v1/user/reviews/:id
 */
const deleteReview = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User;
    const { id: reviewId } = req.params;
    if (!reviewId) {
        throw new APIError(400, "Review ID is required");
    }
    try {
        const { message, success } = await reviewService.deleteReviewById(
            user.id,
            reviewId
        );
        res.status(200).json({
            status: success ? "success" : "error",
            message,
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

export default {
    getMyReviews,
    createReview,
    updateReview,
    deleteReview,
}; 