import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import reviewService from "@/services/review.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get review by ID (public)
 * GET /api/v1/public/reviews/:id
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
 * Get all reviews with pagination and filtering (public)
 * GET /api/v1/public/reviews
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
 * Get reviews by IDs (public)
 * POST /api/v1/public/reviews/batch
 */
// const getReviewsByIds = catchAsync(async (req: Request, res: Response) => {
//     const { ids: reviewIds } = req.body;

//     if (!reviewIds || !Array.isArray(reviewIds)) {
//         throw new APIError(400, "Review IDs array is required");
//     }
//     const query = req.query;
//     try {
//         const { includeRelations } = QuerySchema.parse(query);
//         const reviews = await reviewService.getReviewsByIds(
//             reviewIds,
//             includeRelations
//         );
//         res.status(200).json({
//             data: { reviews },
//             status: "success",
//             message: "Reviews retrieved successfully",
//         });
//         return;
//     } catch (error: any) {
//         if (error instanceof APIError) throw error;
//         if (error instanceof z.ZodError) {
//             throw new APIError(
//                 400,
//                 error.errors.map((e) => e.message).join(", ")
//             );
//         }
//         throw new APIError(500, error.message);
//     }
// });

/**
 * Get reviews by product ID (public)
 * GET /api/v1/public/reviews/product/:id
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

/**
 * Get reviews by village ID (public)
 * GET /api/v1/public/reviews/village/:id
 */
const getVillageReviews = catchAsync(async (req: Request, res: Response) => {
    const { id: villageId } = req.params;
    if (!villageId) {
        throw new APIError(400, "Village ID is required");
    }
    const query = req.query;
    try {
        const { page, limit } =
            QuerySchema.parse(query);
        const reviews = await reviewService.getReviewsByVillageId(villageId,
            page,
            limit,
        );
        res.status(200).json({
            data: { reviews },
            status: "success",
            message: "Village reviews retrieved successfully",
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
 * Get reviews by room ID (public)
 * GET /api/v1/public/reviews/room/:id
 */
const getRoomReviews = catchAsync(async (req: Request, res: Response) => {
    const { id: roomId } = req.params;
    if (!roomId) {
        throw new APIError(400, "Room ID is required");
    }
    const query = req.query;
    try {
        const { page, limit } =
            QuerySchema.parse(query);
        const reviews = await reviewService.getReviewsByRoomId(roomId,
            page,
            limit,
        );
        res.status(200).json({
            data: { reviews },
            status: "success",
            message: "Room reviews retrieved successfully",
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
 * Get reviews by host ID (public)
 * GET /api/v1/public/reviews/host/:id
 */
const getHostReviews = catchAsync(async (req: Request, res: Response) => {
    const { id: hostId } = req.params;
    if (!hostId) {
        throw new APIError(400, "Host ID is required");
    }
    const query = req.query;
    try {
        const { page, limit } =
            QuerySchema.parse(query);
        const reviews = await reviewService.getReviewsByHostId(hostId,
            page,
            limit,
        );
        res.status(200).json({
            data: { reviews },
            status: "success",
            message: "Host reviews retrieved successfully",
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
    getReviewById,
    getAllReviews,
    // getReviewsByIds,
    getProductReviews,
    getVillageReviews,
    getRoomReviews,
    getHostReviews,
}; 