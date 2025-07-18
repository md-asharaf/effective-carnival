import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import villageService from "@/services/village.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get village by ID (public)
 * GET /api/v1/public/villages/:id
 */
const getVillageById = catchAsync(async (req: Request, res: Response) => {
    const { id: villageId } = req.params;
    if (!villageId) {
        throw new APIError(400, "Village ID is required");
    }
    try {
        const village = await villageService.getVillageById(
            villageId,
        );
        if (!village) {
            throw new APIError(404, "Village not found");
        }
        res.status(200).json({
            data: { village },
            status: "success",
            message: "Village retrieved successfully",
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
 * Get all villages with pagination and filtering (public)
 * GET /api/v1/public/villages
 */
const getAllVillages = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit} =
            QuerySchema.parse(query);
        const data = await villageService.getAllVillages(
            page,
            limit,
        );
        res.status(200).json({
            data,
            status: "success",
            message: "Villages retrieved successfully",
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
 * Get villages by IDs (public)
 * POST /api/v1/public/villages/batch
 */
// const getVillagesByIds = catchAsync(async (req: Request, res: Response) => {
//     const { ids: villageIds } = req.body;

//     if (!villageIds || !Array.isArray(villageIds)) {
//         throw new APIError(400, "Village IDs array is required");
//     }
//     const query = req.query;
//     try {
//         const { includeRelations } = QuerySchema.parse(query);
//         const villages = await villageService.getVillagesByIds(
//             villageIds,
//             includeRelations
//         );
//         res.status(200).json({
//             data: { villages },
//             status: "success",
//             message: "Villages retrieved successfully",
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

export default {
    getVillageById,
    getAllVillages,
    // getVillagesByIds,
}; 