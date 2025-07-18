import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import productService from "@/services/product.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get product by ID (public)
 * GET /api/v1/public/products/:id
 */
const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    if (!productId) {
        throw new APIError(400, "Product ID is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const product = await productService.getProductById(
            productId,
            includeRelations
        );
        if (!product) {
            throw new APIError(404, "Product not found");
        }
        res.status(200).json({
            data: { product },
            status: "success",
            message: "Product retrieved successfully",
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
 * Get all products with pagination and filtering (public)
 * GET /api/v1/public/products
 */
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit, includeRelations, search } =
            QuerySchema.parse(query);
        const data = await productService.getAllProducts({
            page,
            limit,
            search,
            includeRelations,
        });
        res.status(200).json({
            data,
            status: "success",
            message: "Products retrieved successfully",
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
 * Get products by IDs (public)
 * POST /api/v1/public/products/batch
 */
const getProductsByIds = catchAsync(async (req: Request, res: Response) => {
    const { ids: productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
        throw new APIError(400, "Product IDs array is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const products = await productService.getProductsByIds(
            productIds,
            includeRelations
        );
        res.status(200).json({
            data: { products },
            status: "success",
            message: "Products retrieved successfully",
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
 * Get products by village ID (public)
 * GET /api/v1/public/products/village/:id
 */
const getProductsByVillageId = catchAsync(async (req: Request, res: Response) => {
    const { id: villageId } = req.params;
    if (!villageId) {
        throw new APIError(400, "Village ID is required");
    }
    const query = req.query;
    try {
        const { page, limit, includeRelations } =
            QuerySchema.parse(query);
        const products = await productService.getProductsByVillageId(villageId, {
            page,
            limit,
            includeRelations,
        });
        res.status(200).json({
            data: { products },
            status: "success",
            message: "Village products retrieved successfully",
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
    getProductById,
    getAllProducts,
    getProductsByIds,
    getProductsByVillageId,
}; 