import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import productService from "@/services/product.service";
import { type ProductCreate, type ProductUpdate } from "@/@types/schema";

/**
 * Create a new product (for vendors)
 * POST /api/v1/user/products
 */
const createProduct = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const productData: ProductCreate = {
        ...req.body,
        vendorId: userId, // Ensure vendorId is set from authenticated user
    };

    const product = await productService.createProduct(productData);

    res.status(201).json({
        status: "success",
        data: product,
    });
});

/**
 * Get user's products (for vendors)
 * GET /api/v1/user/products
 */
const getUserProducts = catchAsync(async (req: Request, res: Response) => {
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
    // For now, we'll use getAllProducts with a filter
    const result = await productService.getAllProducts({
        page: pageNum,
        limit: limitNum,
        includeRelations: includeRelations === "true",
    });

    // Filter products by vendorId (this should be done in the service)
    const userProducts = result.products.filter((product: any) => product.vendorId === userId);

    res.status(200).json({
        status: "success",
        data: {
            products: userProducts,
            total: userProducts.length,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(userProducts.length / limitNum),
        },
    });
});

/**
 * Get user's product by ID
 * GET /api/v1/user/products/:productId
 */
const getUserProductById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { productId } = req.params;
    const { includeRelations = "true" } = req.query;

    const product = await productService.getProductById(
        productId,
        includeRelations === "true"
    );

    if (!product) {
        throw new APIError(404, "Product not found");
    }

    // Ensure user can only access their own products
    if (product.vendorId !== userId) {
        throw new APIError(403, "Access denied");
    }

    res.status(200).json({
        status: "success",
        data: product,
    });
});

/**
 * Update user's product
 * PUT /api/v1/user/products/:productId
 */
const updateUserProduct = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { productId } = req.params;
    const updateData: ProductUpdate = req.body;

    // First check if product belongs to user
    const existingProduct = await productService.getProductById(productId, false);
    if (!existingProduct) {
        throw new APIError(404, "Product not found");
    }

    if (existingProduct.vendorId !== userId) {
        throw new APIError(403, "Access denied");
    }

    const product = await productService.updateProductById(productId, updateData);

    res.status(200).json({
        status: "success",
        data: product,
    });
});

/**
 * Delete user's product
 * DELETE /api/v1/user/products/:productId
 */
const deleteUserProduct = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { productId } = req.params;

    // First check if product belongs to user
    const existingProduct = await productService.getProductById(productId, false);
    if (!existingProduct) {
        throw new APIError(404, "Product not found");
    }

    if (existingProduct.vendorId !== userId) {
        throw new APIError(403, "Access denied");
    }

    const result = await productService.deleteProductById(productId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

export default {
    createProduct,
    getUserProducts,
    getUserProductById,
    updateUserProduct,
    deleteUserProduct,
}; 