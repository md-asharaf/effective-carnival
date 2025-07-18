import { QuerySchema } from "@/@types/interface";
import { ReviewUpdate } from "@/@types/schema";
import catchAsync from "@/handlers/async.handler";
import reviewService from "@/services/review.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get all reviews with pagination and filtering (admin)
 * GET /api/v1/admin/reviews
 */
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit } =
            QuerySchema.parse(query);
        const data = await reviewService.getAllReviews(
            page,
            limit,
        );
        res.status(200).json({
            data,
            status: "success",
            message: "Reviews retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        if (error instanceof z.ZodError) {
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        throw new APIError(500, error.message);
    }
});

/**
 * Get review by ID (admin)
 * GET /api/v1/admin/reviews/:id
 */
const getReviewById = catchAsync(async (req: Request, res: Response) => {
    const { id: reviewId } = req.params;
    if (!reviewId) {
        throw new APIError(400, "Review ID is required");
    }
    try {
        const review = await reviewService.getReviewById(
            reviewId,
        );
        if (!review) {
            throw new APIError(404, "Review not found");
        }
        res.status(200).json({
            data: { review },
            status: "success",
            message: "Review retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        if (error instanceof z.ZodError) {
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        throw new APIError(500, error.message);
    }
});

/**
 * Update review by ID (admin)
 * PATCH /api/v1/admin/reviews/:id
 */
const updateReview = catchAsync(async (req: Request, res: Response) => {
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
            "admin", // Admin can update any review
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
 * Delete review by ID (admin)
 * DELETE /api/v1/admin/reviews/:id
 */
const deleteReview = catchAsync(async (req: Request, res: Response) => {
    const { id: reviewId } = req.params;
    if (!reviewId) {
        throw new APIError(400, "Review ID is required");
    }
    try {
        const { message, success } = await reviewService.deleteReviewById(
            "admin", // Admin can delete any review
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

/**
 * Get reviews by user ID (admin)
 * GET /api/v1/admin/reviews/user/:id
 */
const getUserReviews = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.params;
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
 * Get reviews by product ID (admin)
 * GET /api/v1/admin/reviews/product/:id
 */
const getProductReviews = catchAsync(async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    if (!productId) {
        throw new APIError(400, "Product ID is required");
    }
    const query = req.query;
    try {
        const { page, limit } =
            QuerySchema.parse(query);
        const reviews = await reviewService.getReviewsByProductId(productId,
            page,
            limit,
        );
        res.status(200).json({
            data: { reviews },
            status: "success",
            message: "Product reviews retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        if (error instanceof z.ZodError) {
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        throw new APIError(500, error.message);
    }
});

export default {
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getUserReviews,
    getProductReviews,
}; 