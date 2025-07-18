import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import roomService from "@/services/room.service";
import { type RoomCreate, type RoomUpdate } from "@/@types/schema";

/**
 * Create a new room (for hosts)
 * POST /api/v1/user/rooms
 */
const createRoom = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const roomData: RoomCreate = {
        ...req.body,
        hostId: userId, // Ensure hostId is set from authenticated user
    };

    const room = await roomService.createRoom(roomData);

    res.status(201).json({
        status: "success",
        data: room,
    });
});

/**
 * Get user's rooms (for hosts)
 * GET /api/v1/user/rooms
 */
const getUserRooms = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { page = "1", limit = "10", includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    // This would need to be implemented in the service
    // For now, we'll use getAllRooms with a filter
    const result = await roomService.getAllRooms(
        pageNum,
        limitNum,
        includeRelations === "true",
    );

    // Filter rooms by hostId (this should be done in the service)
    const userRooms = result.rooms.filter((room: any) => room.hostId === userId);

    res.status(200).json({
        status: "success",
        data: {
            rooms: userRooms,
            total: userRooms.length,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(userRooms.length / limitNum),
        },
    });
});

/**
 * Get user's room by ID
 * GET /api/v1/user/rooms/:roomId
 */
const getUserRoomById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { roomId } = req.params;
    const { includeRelations = "true" } = req.query;

    const room = await roomService.getRoomById(
        roomId,
        includeRelations === "true"
    );

    if (!room) {
        throw new APIError(404, "Room not found");
    }

    // Ensure user can only access their own rooms
    if (room.hostId !== userId) {
        throw new APIError(403, "Access denied");
    }

    res.status(200).json({
        status: "success",
        data: room,
    });
});

/**
 * Update user's room
 * PUT /api/v1/user/rooms/:roomId
 */
const updateUserRoom = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { roomId } = req.params;
    const updateData: RoomUpdate = req.body;

    // First check if room belongs to user
    const existingRoom = await roomService.getRoomById(roomId, false);
    if (!existingRoom) {
        throw new APIError(404, "Room not found");
    }

    if (existingRoom.hostId !== userId) {
        throw new APIError(403, "Access denied");
    }

    const room = await roomService.updateRoom(roomId, updateData);

    res.status(200).json({
        status: "success",
        data: room,
    });
});

/**
 * Delete user's room
 * DELETE /api/v1/user/rooms/:roomId
 */
const deleteUserRoom = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { roomId } = req.params;

    // First check if room belongs to user
    const existingRoom = await roomService.getRoomById(roomId, false);
    if (!existingRoom) {
        throw new APIError(404, "Room not found");
    }

    if (existingRoom.hostId !== userId) {
        throw new APIError(403, "Access denied");
    }

    const result = await roomService.deleteRoom(roomId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

export default {
    createRoom,
    getUserRooms,
    getUserRoomById,
    updateUserRoom,
    deleteUserRoom,
}; 