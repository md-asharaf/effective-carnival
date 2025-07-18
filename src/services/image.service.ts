import {db as prisma} from '@/config/database';
import { CreateImage, UpdateImage, Image } from '@/@types/schema';
import { logger } from '@/config/logger';

class ImageService {
  async createImage(data: CreateImage): Promise<Image> {
    try {
      const image = await prisma.image.create({
        data: {
          url: data.url,
          productId: data.productId,
          villageId: data.villageId,
          roomId: data.roomId,
          hostId: data.hostId,
          reviewId: data.reviewId,
        },
      });

      logger.info(`[IMAGE_SERVICE] : Image created with ID: ${image.id}`);
      return image as Image;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error creating image:', error);
      throw error;
    }
  }

  async getImageById(id: string): Promise<Image | null> {
    try {
      const image = await prisma.image.findUnique({
        where: { id },
      });

      if (!image) {
        logger.warn(`[IMAGE_SERVICE] : Image not found with ID: ${id}`);
        return null;
      }

      logger.info(`[IMAGE_SERVICE] : Image retrieved with ID: ${id}`);
      return image as Image;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error retrieving image:', error);
      throw error;
    }
  }

  async getImagesByProductId(productId: string): Promise<Image[]> {
    try {
      const images = await prisma.image.findMany({
        where: { productId },
      });

      logger.info(`[IMAGE_SERVICE] : Retrieved ${images.length} images for product ID: ${productId}`);
      return images as Image[];
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error retrieving images by product ID:', error);
      throw error;
    }
  }

  async getImagesByVillageId(villageId: string): Promise<Image[]> {
    try {
      const images = await prisma.image.findMany({
        where: { villageId },
      });

      logger.info(`[IMAGE_SERVICE] : Retrieved ${images.length} images for village ID: ${villageId}`);
      return images as Image[];
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error retrieving images by village ID:', error);
      throw error;
    }
  }

  async getImagesByRoomId(roomId: string): Promise<Image[]> {
    try {
      const images = await prisma.image.findMany({
        where: { roomId },
      });

      logger.info(`[IMAGE_SERVICE] : Retrieved ${images.length} images for room ID: ${roomId}`);
      return images as Image[];
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error retrieving images by room ID:', error);
      throw error;
    }
  }

  async getImagesByHostId(hostId: string): Promise<Image[]> {
    try {
      const images = await prisma.image.findMany({
        where: { hostId },
      });

      logger.info(`[IMAGE_SERVICE] : Retrieved ${images.length} images for host ID: ${hostId}`);
      return images as Image[];
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error retrieving images by host ID:', error);
      throw error;
    }
  }

  async getImagesByReviewId(reviewId: string): Promise<Image[]> {
    try {
      const images = await prisma.image.findMany({
        where: { reviewId },
      });

      logger.info(`[IMAGE_SERVICE] : Retrieved ${images.length} images for review ID: ${reviewId}`);
      return images as Image[];
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error retrieving images by review ID:', error);
      throw error;
    }
  }

  async updateImage(id: string, data: UpdateImage): Promise<Image | null> {
    try {
      const image = await prisma.image.update({
        where: { id },
        data: {
          url: data.url,
          productId: data.productId,
          villageId: data.villageId,
          roomId: data.roomId,
          hostId: data.hostId,
          reviewId: data.reviewId,
        },
      });

      logger.info(`[IMAGE_SERVICE] : Image updated with ID: ${id}`);
      return image as Image;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error updating image:', error);
      throw error;
    }
  }

  async deleteImage(id: string): Promise<boolean> {
    try {
      await prisma.image.delete({
        where: { id },
      });

      logger.info(`[IMAGE_SERVICE] : Image deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error deleting image:', error);
      throw error;
    }
  }

  async deleteImagesByProductId(productId: string): Promise<number> {
    try {
      const result = await prisma.image.deleteMany({
        where: { productId },
      });

      logger.info(`[IMAGE_SERVICE] : Deleted ${result.count} images for product ID: ${productId}`);
      return result.count;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error deleting images by product ID:', error);
      throw error;
    }
  }

  async deleteImagesByVillageId(villageId: string): Promise<number> {
    try {
      const result = await prisma.image.deleteMany({
        where: { villageId },
      });

      logger.info(`[IMAGE_SERVICE] : Deleted ${result.count} images for village ID: ${villageId}`);
      return result.count;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error deleting images by village ID:', error);
      throw error;
    }
  }

  async deleteImagesByRoomId(roomId: string): Promise<number> {
    try {
      const result = await prisma.image.deleteMany({
        where: { roomId },
      });

      logger.info(`[IMAGE_SERVICE] : Deleted ${result.count} images for room ID: ${roomId}`);
      return result.count;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error deleting images by room ID:', error);
      throw error;
    }
  }

  async deleteImagesByHostId(hostId: string): Promise<number> {
    try {
      const result = await prisma.image.deleteMany({
        where: { hostId },
      });

      logger.info(`[IMAGE_SERVICE] : Deleted ${result.count} images for host ID: ${hostId}`);
      return result.count;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error deleting images by host ID:', error);
      throw error;
    }
  }

  async deleteImagesByReviewId(reviewId: string): Promise<number> {
    try {
      const result = await prisma.image.deleteMany({
        where: { reviewId },
      });

      logger.info(`[IMAGE_SERVICE] : Deleted ${result.count} images for review ID: ${reviewId}`);
      return result.count;
    } catch (error) {
      logger.error('[IMAGE_SERVICE] : Error deleting images by review ID:', error);
      throw error;
    }
  }
}

export default new ImageService();