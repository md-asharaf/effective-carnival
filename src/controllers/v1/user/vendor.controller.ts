import { User } from "@/@types/schema";
import catchAsync from "@/handlers/async.handler";
import vendorService from "@/services/vendor.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";

/**
 * Get my vendors (user authenticated)
 * GET /api/v1/vendors/my
 */
const getMyVendors = catchAsync(async (req: Request, res: Response) => {
    try {
        const { page, limit, includeRelations } = req.query;
        const data = await vendorService.getAllVendors({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            includeRelations: includeRelations === "true",
        });
        res.status(200).json({
            data,
            status: "success",
            message: "My vendors retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Create vendor (user authenticated)
 * POST /api/v1/vendors
 */
const createVendor = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User;
    const vendorData = req.body;
    try {
        const vendor = await vendorService.createVendor({
            ...vendorData,
            userId: user.id,
        });
        res.status(201).json({
            data: { vendor },
            status: "success",
            message: "Vendor created successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Update my vendor (user authenticated)
 * PATCH /api/v1/vendors/:id
 */
const updateMyVendor = catchAsync(async (req: Request, res: Response) => {
    const { id: vendorId } = req.params;
    const updateData = req.body;
    try {
        const vendor = await vendorService.updateVendorById(vendorId, updateData);
        res.status(200).json({
            data: { vendor },
            status: "success",
            message: "Vendor updated successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

/**
 * Delete my vendor (user authenticated)
 * DELETE /api/v1/vendors/:id
 */
const deleteMyVendor = catchAsync(async (req: Request, res: Response) => {
    const { id: vendorId } = req.params;
    try {
        await vendorService.deleteVendorById(vendorId);
        res.status(200).json({
            status: "success",
            message: "Vendor deleted successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

export default {
    getMyVendors,
    createVendor,
    updateMyVendor,
    deleteMyVendor,
}; 