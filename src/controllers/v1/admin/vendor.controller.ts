import { QuerySchema } from "@/@types/interface";
import { VendorCreate, VendorUpdate } from "@/@types/schema";
import catchAsync from "@/handlers/async.handler";
import vendorService from "@/services/vendor.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get all vendors with pagination and filtering (admin)
 * GET /api/v1/admin/vendors
 */
const getAllVendors = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit, includeRelations, search } =
            QuerySchema.parse(query);
        const data = await vendorService.getAllVendors({
            page,
            limit,
            search,
            includeRelations,
        });
        res.status(200).json({
            data,
            status: "success",
            message: "Vendors retrieved successfully",
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
 * Get vendor by ID (admin)
 * GET /api/v1/admin/vendors/:id
 */
const getVendorById = catchAsync(async (req: Request, res: Response) => {
    const { id: vendorId } = req.params;
    if (!vendorId) {
        throw new APIError(400, "Vendor ID is required");
    }
    try {
        const vendor = await vendorService.getVendorById(
            vendorId,
        );
        if (!vendor) {
            throw new APIError(404, "Vendor not found");
        }
        res.status(200).json({
            data: { vendor },
            status: "success",
            message: "Vendor retrieved successfully",
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
 * Create a new vendor (admin)
 * POST /api/v1/admin/vendors
 */
const createVendor = catchAsync(async (req: Request, res: Response) => {
    const { name, rating, villageId, contact, userId } = req.body as VendorCreate;
    if (!name || !villageId || !userId) {
        throw new APIError(400, "Missing required fields: name, villageId and userId are required");
    }
    try {
        const vendor = await vendorService.createVendor({ 
            name, 
            rating: rating || "0", 
            villageId,
            contact,
            userId
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
 * Update vendor by ID (admin)
 * PATCH /api/v1/admin/vendors/:id
 */
const updateVendor = catchAsync(async (req: Request, res: Response) => {
    const { id: vendorId } = req.params;
    const { name, rating, villageId, contact } = req.body as VendorUpdate;

    if (!vendorId) {
        throw new APIError(400, "Vendor ID is required");
    }
    if (!name && !rating && !villageId && !contact) {
        throw new APIError(400, "At least one field is required for update");
    }

    try {
        const updatedVendor = await vendorService.updateVendorById(
            vendorId,
            {
                name,
                rating,
                villageId,
                contact,
            }
        );
        res.status(200).json({
            data: { vendor: updatedVendor },
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
 * Delete vendor by ID (admin)
 * DELETE /api/v1/admin/vendors/:id
 */
const deleteVendor = catchAsync(async (req: Request, res: Response) => {
    const { id: vendorId } = req.params;
    if (!vendorId) {
        throw new APIError(400, "Vendor ID is required");
    }
    try {
        const { message, success } = await vendorService.deleteVendorById(
            vendorId
        );
        res.status(200).json({
            status: success ? "success" : "error",
            message,
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

export default {
    getAllVendors,
    getVendorById,
    createVendor,
    updateVendor,
    deleteVendor,
}; 