import {db as prisma} from '@/config/database';
import { CreateVendor, UpdateVendor, Vendor } from '@/@types/schema';
import { logger } from '@/config/logger';

class VendorService {
  async createVendor(data: CreateVendor): Promise<Vendor> {
    try {
      const vendor = await prisma.vendor.create({
        data: {
          userId: data.userId,
          villageId: data.villageId,
          name: data.name,
          contact: data.contact,
          rating: data.rating || 0,
        },
      });

      logger.info(`[VENDOR_SERVICE] : Vendor created with ID: ${vendor.id}`);
      return vendor as Vendor;
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error creating vendor:', error);
      throw error;
    }
  }

  async getVendorById(id: string): Promise<Vendor | null> {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { id },
      });

      if (!vendor) {
        logger.warn(`[VENDOR_SERVICE] : Vendor not found with ID: ${id}`);
        return null;
      }

      logger.info(`[VENDOR_SERVICE] : Vendor retrieved with ID: ${id}`);
      return vendor as Vendor;
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error retrieving vendor:', error);
      throw error;
    }
  }

  async getVendorByUserId(userId: string): Promise<Vendor | null> {
    try {
      const vendor = await prisma.vendor.findFirst({
        where: { userId },
      });

      if (!vendor) {
        logger.warn(`[VENDOR_SERVICE] : Vendor not found with user ID: ${userId}`);
        return null;
      }

      logger.info(`[VENDOR_SERVICE] : Vendor retrieved with user ID: ${userId}`);
      return vendor as Vendor;
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error retrieving vendor by user ID:', error);
      throw error;
    }
  }

  async getVendorsByVillageId(villageId: string, page: number = 1, limit: number = 10): Promise<{ vendors: Vendor[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [vendors, total] = await Promise.all([
        prisma.vendor.findMany({
          where: { villageId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.vendor.count({
          where: { villageId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[VENDOR_SERVICE] : Retrieved ${vendors.length} vendors for village ID: ${villageId} (page ${page}/${totalPages})`);
      return {
        vendors: vendors as Vendor[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error retrieving vendors by village ID:', error);
      throw error;
    }
  }

  async getAllVendors(options: { page?: number; limit?: number; search?: string; includeRelations?: boolean }): Promise<{ vendors: Vendor[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const { page = 1, limit = 10, search, includeRelations = false } = options;
      const skip = (page - 1) * limit;

      const whereClause = search ? {
        OR: [
          { name: { contains: search } },
          { contact: { contains: search } },
        ],
      } : {};

      const [vendors, total] = await Promise.all([
        prisma.vendor.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            user: true,
            village: true,
            products: true,
          } : undefined,
        }),
        prisma.vendor.count({ where: whereClause }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[VENDOR_SERVICE] : Retrieved ${vendors.length} vendors (page ${page}/${totalPages})`);
      return {
        vendors: vendors as Vendor[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error retrieving all vendors:', error);
      throw error;
    }
  }

  async updateVendor(id: string, data: UpdateVendor): Promise<Vendor | null> {
    try {
      const vendor = await prisma.vendor.update({
        where: { id },
        data: {
          userId: data.userId,
          villageId: data.villageId,
          name: data.name,
          contact: data.contact,
          rating: data.rating,
        },
      });

      logger.info(`[VENDOR_SERVICE] : Vendor updated with ID: ${id}`);
      return vendor as Vendor;
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error updating vendor:', error);
      throw error;
    }
  }

  async updateVendorById(id: string, data: UpdateVendor): Promise<Vendor | null> {
    return this.updateVendor(id, data);
  }

  async deleteVendor(id: string): Promise<boolean> {
    try {
      await prisma.vendor.delete({
        where: { id },
      });

      logger.info(`[VENDOR_SERVICE] : Vendor deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error deleting vendor:', error);
      throw error;
    }
  }

  async deleteVendorById(id: string): Promise<{ message: string; success: boolean }> {
    try {
      await prisma.vendor.delete({
        where: { id },
      });

      logger.info(`[VENDOR_SERVICE] : Vendor deleted with ID: ${id}`);
      return { message: 'Vendor deleted successfully', success: true };
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error deleting vendor:', error);
      return { message: 'Failed to delete vendor', success: false };
    }
  }

  async searchVendors(query: string, page: number = 1, limit: number = 10): Promise<{ vendors: Vendor[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [vendors, total] = await Promise.all([
        prisma.vendor.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { contact: { contains: query, mode: 'insensitive' } },
            ],
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.vendor.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { contact: { contains: query, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[VENDOR_SERVICE] : Found ${vendors.length} vendors matching query "${query}" (page ${page}/${totalPages})`);
      return {
        vendors: vendors as Vendor[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[VENDOR_SERVICE] : Error searching vendors:', error);
      throw error;
    }
  }
}

export default new VendorService();
