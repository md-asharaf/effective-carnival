import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import vendorService from "@/services/vendor.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get vendor by ID (public)
 * GET /api/v1/public/vendors/:id
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
 * Get all vendors with pagination and filtering (public)
 * GET /api/v1/public/vendors
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
 * Get vendors by IDs (public)
 * POST /api/v1/public/vendors/batch
 */
// const getVendorsByIds = catchAsync(async (req: Request, res: Response) => {
//     const { ids: vendorIds } = req.body;

//     if (!vendorIds || !Array.isArray(vendorIds)) {
//         throw new APIError(400, "Vendor IDs array is required");
//     }
//     const query = req.query;
//     try {
//         const { includeRelations } = QuerySchema.parse(query);
//         const vendors = await vendorService.getVendorsByIds(
//             vendorIds,
//             includeRelations
//         );
//         res.status(200).json({
//             data: { vendors },
//             status: "success",
//             message: "Vendors retrieved successfully",
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
    getVendorById,
    getAllVendors,
    // getVendorsByIds,
}; 