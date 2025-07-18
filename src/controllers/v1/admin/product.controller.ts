import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import productService from "@/services/product.service";
import { type ProductCreate, type ProductUpdate } from "@/@types/schema";

/**
 * Get all products (admin view)
 * GET /api/v1/admin/products
 */
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const { page = "1", limit = "10", search, includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await productService.getAllProducts({
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
 * Get product by ID (admin view)
 * GET /api/v1/admin/products/:productId
 */
const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { includeRelations = "true" } = req.query;

    const product = await productService.getProductById(
        productId,
        includeRelations === "true"
    );

    if (!product) {
        throw new APIError(404, "Product not found");
    }

    res.status(200).json({
        status: "success",
        data: product,
    });
});

/**
 * Create a product (admin)
 * POST /api/v1/admin/products
 */
const createProduct = catchAsync(async (req: Request, res: Response) => {
    const productData: ProductCreate = req.body;

    const product = await productService.createProduct(productData);

    res.status(201).json({
        status: "success",
        data: product,
    });
});

/**
 * Update product (admin)
 * PUT /api/v1/admin/products/:productId
 */
const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updateData: ProductUpdate = req.body;

    const product = await productService.updateProductById(productId, updateData);

    res.status(200).json({
        status: "success",
        data: product,
    });
});

/**
 * Delete product (admin)
 * DELETE /api/v1/admin/products/:productId
 */
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;

    const result = await productService.deleteProductById(productId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get products by village ID (admin)
 * GET /api/v1/admin/products/village/:villageId
 */
const getProductsByVillage = catchAsync(async (req: Request, res: Response) => {
    const { villageId } = req.params;
    const { page = "1", limit = "10", search, includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await productService.getProductsByVillageId(villageId, {
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
 * Get products by multiple IDs (admin)
 * GET /api/v1/admin/products/by-ids
 */
const getProductsByIds = catchAsync(async (req: Request, res: Response) => {
    const { ids } = req.query;
    const { includeRelations = "true" } = req.query;

    if (!ids || typeof ids !== 'string') {
        throw new APIError(400, "Product IDs are required");
    }

    const productIds = ids.split(',').filter(id => id.trim());
    
    if (productIds.length === 0) {
        throw new APIError(400, "At least one product ID is required");
    }

    const products = await productService.getProductsByIds(
        productIds,
        includeRelations === "true"
    );

    res.status(200).json({
        status: "success",
        data: products,
    });
});

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByVillage,
    getProductsByIds,
}; 