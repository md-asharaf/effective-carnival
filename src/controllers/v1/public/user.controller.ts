import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import userService from "@/services/user.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get user by ID (public)
 * GET /api/v1/public/users/:id
 */
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    if (!userId) {
        throw new APIError(400, "User ID is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const user = await userService.getUserById(
            userId,
            includeRelations
        );
        if (!user) {
            throw new APIError(404, "User not found");
        }
        res.status(200).json({
            data: { user },
            status: "success",
            message: "User retrieved successfully",
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
 * Get all users with pagination and filtering (public)
 * GET /api/v1/public/users
 */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit, includeRelations, search } =
            QuerySchema.parse(query);
        const data = await userService.getAllUsers({
            page,
            limit,
            search,
            includeRelations,
        });
        res.status(200).json({
            data,
            status: "success",
            message: "Users retrieved successfully",
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
 * Get users by IDs (public)
 * POST /api/v1/public/users/batch
 */
const getUsersByIds = catchAsync(async (req: Request, res: Response) => {
    const { ids: userIds } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
        throw new APIError(400, "User IDs array is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const users = await userService.getUsersByIds(
            userIds,
            includeRelations
        );
        res.status(200).json({
            data: { users },
            status: "success",
            message: "Users retrieved successfully",
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
    getUserById,
    getAllUsers,
    getUsersByIds,
}; 