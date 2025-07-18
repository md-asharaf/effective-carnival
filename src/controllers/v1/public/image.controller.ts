import catchAsync from "@/handlers/async.handler";
import imageService from "@/services/image.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get image by ID (public)
 * GET /api/v1/public/images/:id
 */
const getImageById = catchAsync(async (req: Request, res: Response) => {
    const { id: imageId } = req.params;
    if (!imageId) {
        throw new APIError(400, "Image ID is required");
    }
    try {
        const image = await imageService.getImageById(
            imageId,
        );
        if (!image) {
            throw new APIError(404, "Image not found");
        }
        res.status(200).json({
            data: { image },
            status: "success",
            message: "Image retrieved successfully",
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
 * Get all images with pagination and filtering (public)
 * GET /api/v1/public/images
 */
// const getAllImages = catchAsync(async (req: Request, res: Response) => {
//     const query = req.query;
//     try {
//         const { page, limit, includeRelations } =
//             QuerySchema.parse(query);
//         const data = await imageService.getAllImages({
//             page,
//             limit,
//             includeRelations,
//         });
//         res.status(200).json({
//             data,
//             status: "success",
//             message: "Images retrieved successfully",
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
 * Get images by IDs (public)
 * POST /api/v1/public/images/batch
 */
// const getImagesByIds = catchAsync(async (req: Request, res: Response) => {
//     const { ids: imageIds } = req.body;

//     if (!imageIds || !Array.isArray(imageIds)) {
//         throw new APIError(400, "Image IDs array is required");
//     }
//     const query = req.query;
//     try {
//         const { includeRelations } = QuerySchema.parse(query);
//         const images = await imageService.getImagesByIds(
//             imageIds,
//             includeRelations
//         );
//         res.status(200).json({
//             data: { images },
//             status: "success",
//             message: "Images retrieved successfully",
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
 * Get images by product ID (public)
 * GET /api/v1/public/images/product/:id
 */
const getImagesByProductId = catchAsync(async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    if (!productId) {
        throw new APIError(400, "Product ID is required");
    }
    try {
        
        const images = await imageService.getImagesByProductId(productId
        );
        res.status(200).json({
            data: { images },
            status: "success",
            message: "Product images retrieved successfully",
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
    getImageById,
    // getAllImages,
    // getImagesByIds,
    getImagesByProductId,
}; 