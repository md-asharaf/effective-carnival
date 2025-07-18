import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import roomService from "@/services/room.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get room by ID (public)
 * GET /api/v1/public/rooms/:id
 */
const getRoomById = catchAsync(async (req: Request, res: Response) => {
    const { id: roomId } = req.params;
    if (!roomId) {
        throw new APIError(400, "Room ID is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const room = await roomService.getRoomById(
            roomId,
            includeRelations
        );
        if (!room) {
            throw new APIError(404, "Room not found");
        }
        res.status(200).json({
            data: { room },
            status: "success",
            message: "Room retrieved successfully",
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
 * Get all rooms with pagination and filtering (public)
 * GET /api/v1/public/rooms
 */
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit, includeRelations } =
            QuerySchema.parse(query);
        const data = await roomService.getAllRooms(
            page,
            limit,
            includeRelations,
        );
        res.status(200).json({
            data,
            status: "success",
            message: "Rooms retrieved successfully",
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
 * Get rooms by IDs (public)
 * POST /api/v1/public/rooms/batch
 */
const getRoomsByIds = catchAsync(async (req: Request, res: Response) => {
    const { ids: roomIds } = req.body;

    if (!roomIds || !Array.isArray(roomIds)) {
        throw new APIError(400, "Room IDs array is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const rooms = await roomService.getRoomsByIds(
            roomIds,
            includeRelations
        );
        res.status(200).json({
            data: { rooms },
            status: "success",
            message: "Rooms retrieved successfully",
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
    getRoomById,
    getAllRooms,
    getRoomsByIds,
}; 