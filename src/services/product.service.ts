import {db as prisma} from '@/config/database';
import { CreateProduct, UpdateProduct, Product } from '@/@types/schema';
import { logger } from '@/config/logger';

class ProductService {
  async createProduct(data: CreateProduct): Promise<Product> {
    try {
      const product = await prisma.product.create({
        data: {
          vendorId: data.vendorId,
          villageId: data.villageId,
          name: data.name,
          description: data.description,
          price: data.price,
          rating: data.rating || 0,
        },
      });

      logger.info(`[PRODUCT_SERVICE] : Product created with ID: ${product.id}`);
      return product as Product;
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error creating product:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        logger.warn(`[PRODUCT_SERVICE] : Product not found with ID: ${id}`);
        return null;
      }

      logger.info(`[PRODUCT_SERVICE] : Product retrieved with ID: ${id}`);
      return product as Product;
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error retrieving product:', error);
      throw error;
    }
  }

  async getProductsByVendorId(vendorId: string, page: number = 1, limit: number = 10): Promise<{ products: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: { vendorId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({
          where: { vendorId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[PRODUCT_SERVICE] : Retrieved ${products.length} products for vendor ID: ${vendorId} (page ${page}/${totalPages})`);
      return {
        products: products as Product[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error retrieving products by vendor ID:', error);
      throw error;
    }
  }

  async getProductsByVillageId(villageId: string, page: number = 1, limit: number = 10): Promise<{ products: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: { villageId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({
          where: { villageId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[PRODUCT_SERVICE] : Retrieved ${products.length} products for village ID: ${villageId} (page ${page}/${totalPages})`);
      return {
        products: products as Product[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error retrieving products by village ID:', error);
      throw error;
    }
  }

  async getAllProducts(page: number = 1, limit: number = 10): Promise<{ products: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count(),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[PRODUCT_SERVICE] : Retrieved ${products.length} products (page ${page}/${totalPages})`);
      return {
        products: products as Product[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error retrieving all products:', error);
      throw error;
    }
  }

  async updateProduct(id: string, data: UpdateProduct): Promise<Product | null> {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          vendorId: data.vendorId,
          villageId: data.villageId,
          name: data.name,
          description: data.description,
          price: data.price,
          rating: data.rating,
        },
      });

      logger.info(`[PRODUCT_SERVICE] : Product updated with ID: ${id}`);
      return product as Product;
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({
        where: { id },
      });

      logger.info(`[PRODUCT_SERVICE] : Product deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error deleting product:', error);
      throw error;
    }
  }

  async searchProducts(query: string, page: number = 1, limit: number = 10): Promise<{ products: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[PRODUCT_SERVICE] : Found ${products.length} products matching query "${query}" (page ${page}/${totalPages})`);
      return {
        products: products as Product[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[PRODUCT_SERVICE] : Error searching products:', error);
      throw error;
    }
  }
}

export default new ProductService();
