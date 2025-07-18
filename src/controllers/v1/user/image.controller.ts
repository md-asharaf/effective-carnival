import catchAsync from "@/handlers/async.handler";
import imageService from "@/services/image.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";

/**
 * Get my images (user authenticated)
 * GET /api/v1/images/my
 */
// const getMyImages = catchAsync(async (req: Request, res: Response) => {
//     try {
//         const { page, limit, includeRelations } = req.query;
//         const data = await imageService.getImageById,age({
//             page: Number(page) || 1,
//             limit: Number(limit) || 10,
//             includeRelations: includeRelations === "true",
//         });
//         res.status(200).json({
//             data,
//             status: "success",
//             message: "My images retrieved successfully",
//         });
//         return;
//     } catch (error: any) {
//         if (error instanceof APIError) throw error;
//         throw new APIError(500, error.message);
//     }
// });

/**
 * Create image (user authenticated)
 * POST /api/v1/images
 */
const createImage = catchAsync(async (req: Request, res: Response) => {
    const imageData = req.body;
    try {
        const image = await imageService.createImage(imageData);
        res.status(201).json({
            data: { image },
            status: "success",
            message: "Image created successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Update my image (user authenticated)
 * PATCH /api/v1/images/:id
 */
const updateMyImage = catchAsync(async (req: Request, res: Response) => {
    const { id: imageId } = req.params;
    const updateData = req.body;
    try {
        const image = await imageService.updateImage(imageId, updateData);
        res.status(200).json({
            data: { image },
            status: "success",
            message: "Image updated successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Delete my image (user authenticated)
 * DELETE /api/v1/images/:id
 */
const deleteMyImage = catchAsync(async (req: Request, res: Response) => {
    const { id: imageId } = req.params;
    try {
        await imageService.deleteImage(imageId);
        res.status(200).json({
            status: "success",
            message: "Image deleted successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

export default {
    // getMyImages,
    createImage,
    updateMyImage,
    deleteMyImage,
}; 