import { db } from "@/config/database";
import { logger } from "@/config/logger";
import { APIError } from "@/utils/APIError";
import {
    ImageCreateSchema,
    ImageUpdateSchema,
    type ImageCreate,
    type ImageUpdate,
    type Image,
    type ImageWithRelations,
} from "@/@types/schema";
import { and, eq, inArray } from "drizzle-orm";
import { images } from "@/db/schema";

class ImageService {
    /**
     * Create a new productImage
     */
    async createImage(productImagesData: ImageCreate): Promise<Image> {
        try {
            // Validate input data
            const validatedData = ImageCreateSchema.parse(productImagesData);

            // Check if image with productId already exists
            const existingImage = await db.query.images.findFirst({
                where: and(eq(images.productId, validatedData.productId || ""), eq(images.categoryId, validatedData.categoryId || ""), eq(images.subCategoryId, validatedData.subCategoryId || "")),
            });

            if (existingImage) {
                throw new APIError(
                    409,
                    "Image with this productId or categoryId or subCategoryId already exists"
                );
            }

            // Create the image
            const [createdImage] = await db
                .insert(images)
                .values(validatedData)
                .returning();

            logger.info(
                `[IMAGE_SERVICE] Image created successfully with ID: ${createdImage.id}`
            );
            return createdImage;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error("[IMAGE_SERVICE] Error creating productImage:", error);
            throw new APIError(500, "Failed to create productImage");
        }
    }

    /**
     * Get productImages by ID
     */
    async getImageById(
        id: string,
        includeRelations: boolean = false
    ): Promise<Image | ImageWithRelations | null> {
        try {
            const image = await db.query.images.findFirst({
                where: eq(images.id, id),
                with: includeRelations
                    ? {
                        product: true,
                    }
                    : undefined,
            });

            logger.info(
                `[IMAGE_SERVICE] Image retrieved successfully with ID: ${id}`
            );
            return image || null;
        } catch (error) {
            logger.error(
                `[IMAGE_SERVICE] Error getting productImage by ID ${id}:`,
                error
            );
            throw new APIError(500, "Failed to retrieve productImage");
        }
    }

    /**
     * Update productImages by ID
     */
    async updateImage(
        id: string,
        productImagesData: ImageUpdate
    ): Promise<Image> {
        try {
            // Validate input data
            const validatedData = ImageUpdateSchema.parse(productImagesData);

            // Check if image exists
            const existingImage = await db.query.images.findFirst({
                where: eq(images.id, id),
                columns: {},
            });

            if (!existingImage) {
                throw new APIError(404, "Image not found");
            }

            // Update the image
            const [updatedImage] = await db
                .update(images)
                .set(validatedData)
                .where(eq(images.id, id))
                .returning();

            logger.info(
                `[IMAGE_SERVICE] Image updated successfully with ID: ${id}`
            );
            return updatedImage;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[IMAGE_SERVICE] Error updating productImage ${id}:`,
                error
            );
            throw new APIError(500, "Failed to update productImage");
        }
    }

    /**
     * Delete productImages by ID
     */
    async deleteImage(
        id: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Check if image exists and get its product relation
            const existingImage = await db.query.images.findFirst({
                where: eq(images.id, id),
                columns: {},
            });

            if (!existingImage) {
                throw new APIError(404, "Image not found");
            }

            // Delete the image
            await db.delete(images).where(eq(images.id, id));

            logger.info(
                `[IMAGE_SERVICE] Image deleted successfully with ID: ${id}`
            );
            return {
                success: true,
                message: "Image deleted successfully",
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[IMAGE_SERVICE] Error deleting productImage ${id}:`,
                error
            );
            throw new APIError(500, "Failed to delete productImage");
        }
    }

    /**
     * Soft delete productImages by updating a status field
     */
    async softDeleteImage(
        id: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            // Check if image exists
            const existingImage = await db.query.images.findFirst({
                where: eq(images.id, id),
            });

            if (!existingImage) {
                throw new APIError(404, "Image not found");
            }

            await db
                .update(images)
                .set({
                    isActive: false,
                    deletedAt: new Date(),
                })
                .where(eq(images.id, id));

            logger.info(
                `[IMAGE_SERVICE] Image soft deleted successfully with ID: ${id}`
            );
            return {
                success: true,
                message: "Image deactivated successfully",
            };
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error(
                `[IMAGE_SERVICE] Error soft deleting productImage ${id}:`,
                error
            );
            throw new APIError(500, "Failed to deactivate productImage");
        }
    }

    /**
     * Get productImages by multiple IDs
     */
    async getImagesByIds(ids: string[]): Promise<Image[]> {
        try {
            if (!ids.length) return [];

            const productImages = await db
                .select()
                .from(images)
                .where(inArray(images.id, ids));

            logger.info(
                `[IMAGE_SERVICE] Retrieved ${productImages.length} productImages by IDs`
            );
            return productImages;
        } catch (error) {
            logger.error(
                "[IMAGE_SERVICE] Error getting productImages by IDs:",
                error
            );
            throw new APIError(500, "Failed to retrieve productImages");
        }
    }
}

export default new ImageService();
