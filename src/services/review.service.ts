import { db } from "@/config/database";
import { ReviewCreateSchema, ReviewUpdateSchema } from "@/@types/schema";
import { reviews } from "@/db/schema";
import { logger } from "@/config/logger";
import { eq, and } from "drizzle-orm";
import { APIError } from "@/utils/APIError";
import { z } from "zod";

class ReviewService {
  async createReview(data: unknown) {
    try {
      const validated = ReviewCreateSchema.parse(data);
      const [review] = await db.insert(reviews).values(validated).returning();
      logger.info(`[REVIEW_SERVICE] Created review: ${review.id}`);
      return review;
    } catch (error: any) {
      if (error instanceof APIError) throw error;
      if (error instanceof z.ZodError) {
        throw new APIError(400, error.errors.map(e => e.message).join(", "));
      }
      logger.error(`[REVIEW_SERVICE] Error creating review:`, error);
      throw new APIError(500, "Failed to create review");
    }
  }

  async getReviewById(id: string) {
    try {
      const result = await db.select().from(reviews).where(eq(reviews.id, id));
      if (!result[0]) {
        logger.warn(`[REVIEW_SERVICE] Review not found: ${id}`);
        return null;
      }
      logger.info(`[REVIEW_SERVICE] Fetched review: ${id}`);
      return result[0];
    } catch (error) {
      logger.error(`[REVIEW_SERVICE] Error fetching review by id:`, error);
      throw new APIError(500, "Failed to fetch review");
    }
  }

  async updateReview(id: string, data: unknown) {
    try {
      const validated = ReviewUpdateSchema.parse(data);
      const [review] = await db.update(reviews).set(validated).where(eq(reviews.id, id)).returning();
      if (!review) {
        logger.warn(`[REVIEW_SERVICE] Review not found for update: ${id}`);
        return null;
      }
      logger.info(`[REVIEW_SERVICE] Updated review: ${id}`);
      return review;
    } catch (error: any) {
      if (error instanceof APIError) throw error;
      if (error instanceof z.ZodError) {
        throw new APIError(400, error.errors.map(e => e.message).join(", "));
      }
      logger.error(`[REVIEW_SERVICE] Error updating review:`, error);
      throw new APIError(500, "Failed to update review");
    }
  }

  async deleteReview(id: string) {
    try {
      await db.delete(reviews).where(eq(reviews.id, id));
      logger.info(`[REVIEW_SERVICE] Deleted review: ${id}`);
      return true;
    } catch (error) {
      logger.error(`[REVIEW_SERVICE] Error deleting review:`, error);
      throw new APIError(500, "Failed to delete review");
    }
  }

  async listReviews() {
    try {
      const result = await db.select().from(reviews);
      logger.info(`[REVIEW_SERVICE] Listed reviews`);
      return result;
    } catch (error) {
      logger.error(`[REVIEW_SERVICE] Error listing reviews:`, error);
      throw new APIError(500, "Failed to list reviews");
    }
  }

  async listReviewsByTarget(targetType: "room" | "guide" | "product", targetId: string) {
    try {
      const result = await db.select().from(reviews).where(and(eq(reviews.targetType, targetType), eq(reviews.targetId, targetId)));
      logger.info(`[REVIEW_SERVICE] Listed reviews for target: ${targetType} ${targetId}`);
      return result;
    } catch (error) {
      logger.error(`[REVIEW_SERVICE] Error listing reviews by target:`, error);
      throw new APIError(500, "Failed to list reviews by target");
    }
  }
}

const reviewService = new ReviewService();
export default reviewService;
