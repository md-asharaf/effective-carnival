import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import userService from "@/services/user.service";
import { type UserCreate, type UserUpdate } from "@/@types/schema";

/**
 * Get all users (admin view)
 * GET /api/v1/admin/users
 */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const { page = "1", limit = "10", search, includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await userService.getAllUsers({
        page: pageNum,
        limit: limitNum,
        search: search as string,
        includeRelations: includeRelations === "true",
    });

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get user by ID (admin view)
 * GET /api/v1/admin/users/:userId
 */
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { includeRelations = "true" } = req.query;

    const user = await userService.getUserById(
        userId,
        includeRelations === "true"
    );

    if (!user) {
        throw new APIError(404, "User not found");
    }

    res.status(200).json({
        status: "success",
        data: user,
    });
});

/**
 * Create a user (admin)
 * POST /api/v1/admin/users
 */
const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData: UserCreate = req.body;

    const user = await userService.createUser(userData);

    res.status(201).json({
        status: "success",
        data: user,
    });
});

/**
 * Update user (admin)
 * PUT /api/v1/admin/users/:userId
 */
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updateData: UserUpdate = req.body;

    const user = await userService.updateUser(userId, updateData);

    res.status(200).json({
        status: "success",
        data: user,
    });
});

/**
 * Delete user (admin)
 * DELETE /api/v1/admin/users/:userId
 */
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await userService.deleteUser(userId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get users by multiple IDs (admin)
 * GET /api/v1/admin/users/by-ids
 */
const getUsersByIds = catchAsync(async (req: Request, res: Response) => {
    const { ids } = req.query;
    const { includeRelations = "true" } = req.query;

    if (!ids || typeof ids !== 'string') {
        throw new APIError(400, "User IDs are required");
    }

    const userIds = ids.split(',').filter(id => id.trim());
    
    if (userIds.length === 0) {
        throw new APIError(400, "At least one user ID is required");
    }

    const users = await userService.getUsersByIds(
        userIds,
        includeRelations === "true"
    );

    res.status(200).json({
        status: "success",
        data: users,
    });
});

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUsersByIds,
}; 