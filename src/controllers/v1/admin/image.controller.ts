import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import imageService from "@/services/image.service";
import { ImageCreate, ImageUpdate } from "@/@types/schema";
import z from "zod";


const createImage = catchAsync(async (req: Request, res: Response) => {
    const { hostId, productId, reviewId, roomId, url, villageId } = req.body as ImageCreate;
    if (!url) {
        throw new APIError(400, "url is required")
    }
    if (!hostId && !productId && !reviewId && !roomId && !villageId) {
        throw new APIError(400, "At least one ID field is required for update")
    }
    try {
        const image = await imageService.createImage({
            hostId, productId, reviewId, roomId, url, villageId
        });
        res.status(201).json({
            data: { image },
            status: "success",
            message: "Image created successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        if (error instanceof z.ZodError) {
            throw new APIError(400, error.errors.map((e) => e.message).join(", "))
        }
        throw new APIError(500, error.message);
    }
});

/**
 * Update my image (user authenticated)
 * PATCH /api/v1/images/:id
 */
const updateMyImage = catchAsync(async (req: Request, res: Response) => {
    const { id: imageId } = req.params;
    const { hostId, productId, reviewId, roomId, url, villageId } = req.body as ImageUpdate;
    if (!url) {
        throw new APIError(400, "url is required")
    }
    if (!hostId && !productId && !reviewId && !roomId && !villageId) {
        throw new APIError(400, "At least one ID field is required for update")
    }
    try {
        const image = await imageService.updateImage(imageId, {
            hostId, productId, reviewId, roomId, url, villageId
        });
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
    createImage,
    updateMyImage,
    deleteMyImage,
};
