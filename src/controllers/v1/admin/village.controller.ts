import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import villageService from "@/services/village.service";
import { type VillageCreate, type VillageUpdate } from "@/@types/schema";

/**
 * Get all villages (admin view)
 * GET /api/v1/admin/villages
 */
const getAllVillages = catchAsync(async (req: Request, res: Response) => {
    const { page = "1", limit = "10" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await villageService.getAllVillages(
        pageNum,
        limitNum,
    );

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get village by ID (admin view)
 * GET /api/v1/admin/villages/:villageId
 */
const getVillageById = catchAsync(async (req: Request, res: Response) => {
    const { villageId } = req.params;

    const village = await villageService.getVillageById(
        villageId,
    );

    if (!village) {
        throw new APIError(404, "Village not found");
    }

    res.status(200).json({
        status: "success",
        data: village,
    });
});

/**
 * Create a village (admin)
 * POST /api/v1/admin/villages
 */
const createVillage = catchAsync(async (req: Request, res: Response) => {
    const villageData: VillageCreate = req.body;

    const village = await villageService.createVillage(villageData);

    res.status(201).json({
        status: "success",
        data: village,
    });
});

/**
 * Update village (admin)
 * PUT /api/v1/admin/villages/:villageId
 */
const updateVillage = catchAsync(async (req: Request, res: Response) => {
    const { villageId } = req.params;
    const updateData: VillageUpdate = req.body;

    const village = await villageService.updateVillage(villageId, updateData);

    res.status(200).json({
        status: "success",
        data: village,
    });
});

/**
 * Delete village (admin)
 * DELETE /api/v1/admin/villages/:villageId
 */
const deleteVillage = catchAsync(async (req: Request, res: Response) => {
    const { villageId } = req.params;

    const result = await villageService.deleteVillage(villageId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

export default {
    getAllVillages,
    getVillageById,
    createVillage,
    updateVillage,
    deleteVillage,
};