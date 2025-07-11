import { db } from "@/config/database";
import { logger } from "@/config/logger";
import { APIError } from "@/utils/APIError";
import {
    ProductCreateSchema,
    ProductUpdateSchema,
    type ProductCreate,
    type ProductUpdate,
    type Product,
    type ProductWithRelations,
} from "@/@types/schema";
import { asc, count, eq, ilike, inArray } from "drizzle-orm";
import { products } from "@/db/schema";

class ProductService {
    /**
     * Create a new product
     */
    async createProduct(productData: ProductCreate): Promise<Product> {
        try {
            // Validate input data
            const validatedData = ProductCreateSchema.parse(productData);

            // Check if product with name already exists
            const existingProduct = await db.query.products.findFirst({
                where: eq(products.name, validatedData.name),
            });

            if (existingProduct) {
                throw new APIError(
                    409,
                    "Product with this name already exists"
                );
            }

            // Create the product
            const [product] = await db
                .insert(products)
                .values(validatedData)
                .returning();

            logger.info(
                `[PRODUCT_SERVICE] Product created successfully with ID: ${product.id}`
            );
            return product;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error("[PRODUCT_SERVICE] Error creating product:", error);
            throw new APIError(500, "Failed to create product");
        }
    }

    /**
     * Get product by ID
     */
    async getProductById(
        id: string,
        includeRelations: boolean = false
    ): Promise<Product | ProductWithRelations | null> {
        try {
            const product = await db.query.products.findFirst({
                where: eq(products.id, id),
                with: includeRelations
                    ? {
                          store: true,
                          category: true,
                          images: true,
                      }
                    : undefined,
            });

            if (!product) {
                logger.warn(
                    `[PRODUCT_SERVICE] Product not found with ID: ${id}`
                );
                return null;
            }

            logger.info(
                `[PRODUCT_SERVICE] Product retrieved successfully with ID: ${id}`
            );
            return product;
        } catch (error) {
            logger.error(
                `[PRODUCT_SERVICE] Error getting product by ID ${id}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve product");
        }
    }

    /**
     * Get product by name
     */
    async getProductByName(
        name: string,
        includeRelations: boolean = false
    ): Promise<Product | ProductWithRelations | null> {
        try {
            const product = await db.query.products.findFirst({
                where: eq(products.name, name),
                with: includeRelations
                    ? {
                          store: true,
                          category: true,
                          images: true,
                      }
                    : undefined,
            });

            if (!product) {
                logger.warn(
                    `[PRODUCT_SERVICE] Product not found with name: ${name}`
                );
                return null;
            }

            logger.info(
                `[PRODUCT_SERVICE] Product retrieved successfully with name: ${name}`
            );
            return product;
        } catch (error) {
            logger.error(
                `[PRODUCT_SERVICE] Error getting product by name ${name}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve product");
        }
    }

    /**
     * Get all products with pagination and filtering
     */
    async getAllProducts(
        options: {
            page?: number;
            limit?: number;
            search?: string;
            includeRelations?: boolean;
        } = {}
    ): Promise<{
        products: (Product | ProductWithRelations)[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            const {
                page = 1,
                limit = 10,
                search,
                includeRelations = false,
            } = options;
            const skip = (page - 1) * limit;

            // Build where clause for search
            const where = search
                ? ilike(products.name, `%${search}%`)
                : undefined;

            // Get total count
            const totalResult = await db
                .select({ count: count() })
                .from(products)
                .where(where);

            const total = totalResult[0]?.count ?? 0;

            // Get products
            const allProducts = await db.query.products.findMany({
                where,
                offset: skip,
                limit,
                orderBy: [asc(products.name)],
                with: includeRelations
                    ? {
                          store: true,
                          category: true,
                          images: true,
                      }
                    : undefined,
            });

            const totalPages = Math.ceil(total / limit);

            logger.info(
                `[PRODUCT_SERVICE] Retrieved ${allProducts.length} products (page ${page}/${totalPages})`
            );

            return {
                products: allProducts,
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
            logger.error(
                "[PRODUCT_SERVICE] Error getting all products:",
                error
            );
            throw new APIError(500, "Failed to retrieve products");
        }
    }

    /**
     * Update product by ID
     */
    async updateProduct(
        id: string,
        productData: ProductUpdate
    ): Promise<Product> {
        try {
            // Validate input data
            const validatedData = ProductUpdateSchema.parse(productData);

            // Check if product exists
            const existingProduct = await db.query.products.findFirst({
                where: eq(products.id, id),
                columns: { name: true },
            });

            if (!existingProduct) {
                throw new APIError(404, "Product not found");
            }

            // Check if name is being updated and if it's already taken
            if (
                validatedData.name &&
                validatedData.name !== existingProduct.name
            ) {
                const nameExists = await db.query.products.findFirst({
                    where: eq(products.name, validatedData.name),
                    columns: {},
                });

                if (nameExists) {
                    throw new APIError(
                        409,
                        "Name already taken by another product"
                    );
                }
            }

            // Update the product
            const [updatedProduct] = await db
                .update(products)
                .set(validatedData)
                .where(eq(products.id, id))
                .returning();

            logger.info(
                `[PRODUCT_SERVICE] Product updated successfully with ID: ${id}`
            );
            return updatedProduct;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[PRODUCT_SERVICE] Error updating product ${id}:`,
                error
            );
            throw new APIError(500, "Failed to update product");
        }
    }

    /**
     * Delete product by ID
     */
    async deleteProduct(
        id: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Check if product exists
            const existingProduct = await db.query.products.findFirst({
                where: eq(products.id, id),
                with: {
                    store: true,
                    category: true,
                    images: true,
                },
            });

            if (!existingProduct) {
                throw new APIError(404, "Product not found");
            }

            // Check if product has any memberships
            if (
                !!existingProduct.category ||
                !!existingProduct.images ||
                !!existingProduct.store
            ) {
                throw new APIError(
                    400,
                    "Cannot delete product. Product has associated store, category, or images. Please remove these associations first."
                );
            }

            // Delete the product
            await db.delete(products).where(eq(products.id, id));

            logger.info(
                `[PRODUCT_SERVICE] Product deleted successfully with ID: ${id}`
            );
            return {
                success: true,
                message: "Product deleted successfully",
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[PRODUCT_SERVICE] Error deleting product ${id}:`,
                error
            );
            throw new APIError(500, "Failed to delete product");
        }
    }

    /**
     * Soft delete product by updating a status field (if you want to implement soft delete)
     * Note: This would require adding an isActive or deletedAt field to your schema
     */
    async softDeleteProduct(
        id: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Check if product exists
            const existingProduct = await db.query.products.findFirst({
                where: eq(products.id, id),
            });

            if (!existingProduct) {
                throw new APIError(404, "Product not found");
            }

            await db
                .update(products)
                .set({
                    isActive: false,
                    deletedAt: new Date(),
                })
                .where(eq(products.id, id));

            logger.info(
                `[PRODUCT_SERVICE] Product soft deleted successfully with ID: ${id}`
            );
            return {
                success: true,
                message: "Product deactivated successfully",
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[PRODUCT_SERVICE] Error soft deleting product ${id}:`,
                error
            );
            throw new APIError(500, "Failed to deactivate product");
        }
    }

    /**
     * Check if product exists by name
     */
    async productExists(name: string): Promise<boolean> {
        try {
            const product = await db.query.products.findFirst({
                where: eq(products.name, name),
            });
            return !!product;
        } catch (error) {
            logger.error(
                `[PRODUCT_SERVICE] Error checking if product exists with name ${name}:`,
                error
            );
            throw new APIError(500, "Failed to check product existence");
        }
    }

    /**
     * Get products by multiple IDs
     */
    async getProductsByIds(
        ids: string[],
        includeRelations: boolean = false
    ): Promise<Product[]> {
        try {
            if (!ids.length) return [];
            const foundProducts = await db.query.products.findMany({
                where: inArray(products.id, ids),
                with: includeRelations
                    ? {
                          category: true,
                          images: true,
                          store: true,
                      }
                    : undefined,
            });

            logger.info(
                `[PRODUCT_SERVICE] Retrieved ${foundProducts.length} products by IDs`
            );
            return foundProducts;
        } catch (error) {
            logger.error(
                "[PRODUCT_SERVICE] Error getting products by IDs:",
                error
            );
            throw new APIError(500, "Failed to retrieve products");
        }
    }
}

export default new ProductService();
