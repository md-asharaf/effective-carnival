import {db as prisma} from '@/config/database';
import { CreateReview, UpdateReview, Review } from '@/@types/schema';
import { logger } from '@/config/logger';

class ReviewService {
  async createReview(data: CreateReview): Promise<Review> {
    try {
      const review = await prisma.review.create({
        data: {
          userId: data.userId,
          productId: data.productId,
          hostId: data.hostId,
          villageId: data.villageId,
          roomId: data.roomId,
          rating: data.rating,
          comment: data.comment,
        },
      });

      logger.info(`[REVIEW_SERVICE] : Review created with ID: ${review.id}`);
            return review as Review;
    } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error creating review:', error);
                throw error;
    }
  }

  async getReviewById(id: string): Promise<Review | null> {
    try {
      const review = await prisma.review.findUnique({
        where: { id },
      });

            if (!review) {
        logger.warn(`[REVIEW_SERVICE] : Review not found with ID: ${id}`);
                return null;
            }

      logger.info(`[REVIEW_SERVICE] : Review retrieved with ID: ${id}`);
      return review as Review;
        } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving review:', error);
      throw error;
    }
  }

  async getReviewsByUserId(userId: string, options: { page?: number; limit?: number; rating?: number; includeRelations?: boolean }): Promise<{ reviews: Review[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const { page = 1, limit = 10, rating, includeRelations = false } = options;
      const skip = (page - 1) * limit;

      const whereClause: any = { userId };
      if (rating) {
        whereClause.rating = rating;
      }

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            user: true,
            product: true,
            host: true,
            village: true,
            room: true,
          } : undefined,
        }),
        prisma.review.count({
          where: whereClause,
        }),
      ]);

            const totalPages = Math.ceil(total / limit);

      logger.info(`[REVIEW_SERVICE] : Retrieved ${reviews.length} reviews for user ID: ${userId} (page ${page}/${totalPages})`);
            return {
        reviews: reviews as Review[],
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving reviews by user ID:', error);
                throw error;
    }
  }

  async getReviewsByProductId(productId: string, page: number = 1, limit: number = 10): Promise<{ reviews: Review[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where: { productId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.review.count({
          where: { productId },
        }),
      ]);

            const totalPages = Math.ceil(total / limit);

      logger.info(`[REVIEW_SERVICE] : Retrieved ${reviews.length} reviews for product ID: ${productId} (page ${page}/${totalPages})`);
            return {
        reviews: reviews as Review[],
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving reviews by product ID:', error);
                throw error;
    }
  }

  async getReviewsByHostId(hostId: string, page: number = 1, limit: number = 10): Promise<{ reviews: Review[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where: { hostId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.review.count({
          where: { hostId },
        }),
      ]);

            const totalPages = Math.ceil(total / limit);

      logger.info(`[REVIEW_SERVICE] : Retrieved ${reviews.length} reviews for host ID: ${hostId} (page ${page}/${totalPages})`);
            return {
        reviews: reviews as Review[],
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving reviews by host ID:', error);
                throw error;
    }
  }

  async getReviewsByVillageId(villageId: string, page: number = 1, limit: number = 10): Promise<{ reviews: Review[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where: { villageId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.review.count({
          where: { villageId },
        }),
      ]);

            const totalPages = Math.ceil(total / limit);

      logger.info(`[REVIEW_SERVICE] : Retrieved ${reviews.length} reviews for village ID: ${villageId} (page ${page}/${totalPages})`);
            return {
        reviews: reviews as Review[],
                total,
                page,
                limit,
                totalPages,
            };
        } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving reviews by village ID:', error);
                throw error;
    }
  }

  async getReviewsByRoomId(roomId: string, page: number = 1, limit: number = 10): Promise<{ reviews: Review[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where: { roomId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.review.count({
          where: { roomId },
        }),
      ]);

             const totalPages = Math.ceil(total / limit);

      logger.info(`[REVIEW_SERVICE] : Retrieved ${reviews.length} reviews for room ID: ${roomId} (page ${page}/${totalPages})`);
             return {
        reviews: reviews as Review[],
                 total,
                 page,
                 limit,
                 totalPages,
             };
         } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving reviews by room ID:', error);
      throw error;
    }
  }

  async getAllReviews(page: number = 1, limit: number = 10): Promise<{ reviews: Review[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.review.count(),
      ]);

             const totalPages = Math.ceil(total / limit);

      logger.info(`[REVIEW_SERVICE] : Retrieved ${reviews.length} reviews (page ${page}/${totalPages})`);
             return {
        reviews: reviews as Review[],
                 total,
                 page,
                 limit,
                 totalPages,
             };
         } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error retrieving all reviews:', error);
      throw error;
    }
  }

  async updateReview(id: string, data: UpdateReview): Promise<Review | null> {
    try {
      const review = await prisma.review.update({
        where: { id },
        data: {
          userId: data.userId,
          productId: data.productId,
          hostId: data.hostId,
          villageId: data.villageId,
          roomId: data.roomId,
          rating: data.rating,
          comment: data.comment,
        },
      });

      logger.info(`[REVIEW_SERVICE] : Review updated with ID: ${id}`);
      return review as Review;
    } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error updating review:', error);
      throw error;
    }
  }

  async updateReviewById(userId: string, id: string, data: UpdateReview): Promise<Review | null> {
    try {
      const review = await prisma.review.update({
        where: { id, userId },
        data: {
          productId: data.productId,
          hostId: data.hostId,
          villageId: data.villageId,
          roomId: data.roomId,
          rating: data.rating,
          comment: data.comment,
        },
      });

      logger.info(`[REVIEW_SERVICE] : Review updated with ID: ${id}`);
      return review as Review;
    } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error updating review:', error);
      throw error;
    }
  }

  async deleteReview(id: string): Promise<boolean> {
    try {
      await prisma.review.delete({
        where: { id },
      });

      logger.info(`[REVIEW_SERVICE] : Review deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error deleting review:', error);
      throw error;
         }
     }

  async deleteReviewById(userId: string, id: string): Promise<{ message: string; success: boolean }> {
    try {
      await prisma.review.delete({
        where: { id, userId },
      });

      logger.info(`[REVIEW_SERVICE] : Review deleted with ID: ${id}`);
      return { message: 'Review deleted successfully', success: true };
    } catch (error) {
      logger.error('[REVIEW_SERVICE] : Error deleting review:', error);
      return { message: 'Failed to delete review', success: false };
    }
  }
 }

export default new ReviewService();
