import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import roomService from "@/services/room.service";
import { type RoomCreate, type RoomUpdate } from "@/@types/schema";

/**
 * Get all rooms (admin view)
 * GET /api/v1/admin/rooms
 */
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
    const { page = "1", limit = "10", includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await roomService.getAllRooms(
        pageNum,
        limitNum,
        includeRelations === "true", 
    );

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get room by ID (admin view)
 * GET /api/v1/admin/rooms/:roomId
 */
const getRoomById = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const { includeRelations = "true" } = req.query;

    const room = await roomService.getRoomById(
        roomId,
        includeRelations === "true"
    );

    if (!room) {
        throw new APIError(404, "Room not found");
    }

    res.status(200).json({
        status: "success",
        data: room,
    });
});

/**
 * Create a room (admin)
 * POST /api/v1/admin/rooms
 */
const createRoom = catchAsync(async (req: Request, res: Response) => {
    const roomData: RoomCreate = req.body;

    const room = await roomService.createRoom(roomData);

    res.status(201).json({
        status: "success",
        data: room,
    });
});

/**
 * Update room (admin)
 * PUT /api/v1/admin/rooms/:roomId
 */
const updateRoom = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const updateData: RoomUpdate = req.body;

    const room = await roomService.updateRoom(roomId, updateData);

    res.status(200).json({
        status: "success",
        data: room,
    });
});

/**
 * Delete room (admin)
 * DELETE /api/v1/admin/rooms/:roomId
 */
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;

    const result = await roomService.deleteRoom(roomId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get rooms by multiple IDs (admin)
 * GET /api/v1/admin/rooms/by-ids
 */
const getRoomsByIds = catchAsync(async (req: Request, res: Response) => {
    const { ids } = req.query;
    const { includeRelations = "true" } = req.query;

    if (!ids || typeof ids !== 'string') {
        throw new APIError(400, "Room IDs are required");
    }

    const roomIds = ids.split(',').filter(id => id.trim());
    
    if (roomIds.length === 0) {
        throw new APIError(400, "At least one room ID is required");
    }

    const rooms = await roomService.getRoomsByIds(
        roomIds,
        includeRelations === "true"
    );

    res.status(200).json({
        status: "success",
        data: rooms,
    });
});

export default {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomsByIds,
}; 