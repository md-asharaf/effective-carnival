import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import userService from "@/services/user.service";
import { type UserUpdate } from "@/@types/schema";

/**
 * Get current user profile
 * GET /api/v1/user/profile
 */
const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

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
 * Update current user profile
 * PUT /api/v1/user/profile
 */
const updateCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const updateData: UserUpdate = req.body;

    const user = await userService.updateUser(userId, updateData);

    res.status(200).json({
        status: "success",
        data: user,
    });
});

/**
 * Delete current user account
 * DELETE /api/v1/user/profile
 */
const deleteCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const result = await userService.deleteUser(userId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get user by ID (for authenticated users - can see other users' basic info)
 * GET /api/v1/user/users/:userId
 */
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { includeRelations = "false" } = req.query;

    const user = await userService.getUserById(
        userId,
        includeRelations === "true"
    );

    if (!user) {
        throw new APIError(404, "User not found");
    }

    // For authenticated users, return more information but still protect sensitive data
    const userInfo: any = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    };

    // Include relations if requested and user is authenticated
    if (includeRelations === "true" && 'hosts' in user) {
        userInfo.hosts = (user as any).hosts;
        userInfo.vendors = (user as any).vendors;
        userInfo.reviews = (user as any).reviews;
    }

    res.status(200).json({
        status: "success",
        data: userInfo,
    });
});

export default {
    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
    getUserById,
}; 