import {db as prisma} from '@/config/database';
import { CreateVillage, UpdateVillage, Village } from '@/@types/schema';
import { logger } from '@/config/logger';

class VillageService {
  async createVillage(data: CreateVillage): Promise<Village> {
    try {
      const village = await prisma.village.create({
        data: {
          name: data.name,
          location: data.location,
          description: data.description,
        },
      });
      logger.info(`[VILLAGE_SERVICE] : Village created with ID: ${village.id}`);
      return village as Village;
    } catch (error) {
      logger.error('[VILLAGE_SERVICE] : Error creating village:', error);
      throw error;
    }
  }

  async getVillageById(id: string): Promise<Village | null> {
    try {
      const village = await prisma.village.findUnique({
        where: { id },
      });
      if (!village) {
        logger.warn(`[VILLAGE_SERVICE] : Village not found with ID: ${id}`);
        return null;
      }
      logger.info(`[VILLAGE_SERVICE] : Village retrieved with ID: ${id}`);
      return village as Village;
    } catch (error) {
      logger.error('[VILLAGE_SERVICE] : Error retrieving village:', error);
      throw error;
    }
  }

  async getAllVillages(page: number = 1, limit: number = 10): Promise<{ villages: Village[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;
      const [villages, total] = await Promise.all([
        prisma.village.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.village.count(),
      ]);
      const totalPages = Math.ceil(total / limit);
      logger.info(`[VILLAGE_SERVICE] : Retrieved ${villages.length} villages (page ${page}/${totalPages})`);
      return {
        villages: villages as Village[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[VILLAGE_SERVICE] : Error retrieving all villages:', error);
      throw error;
    }
  }

  async updateVillage(id: string, data: UpdateVillage): Promise<Village | null> {
    try {
      const village = await prisma.village.update({
        where: { id },
        data: {
          name: data.name,
          location: data.location,
          description: data.description,
        },
      });
      logger.info(`[VILLAGE_SERVICE] : Village updated with ID: ${id}`);
      return village as Village;
    } catch (error) {
      logger.error('[VILLAGE_SERVICE] : Error updating village:', error);
      throw error;
    }
  }

  async deleteVillage(id: string): Promise<boolean> {
    try {
      await prisma.village.delete({
        where: { id },
      });
      logger.info(`[VILLAGE_SERVICE] : Village deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[VILLAGE_SERVICE] : Error deleting village:', error);
      throw error;
    }
  }

  async searchVillages(query: string, page: number = 1, limit: number = 10): Promise<{ villages: Village[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;
      const [villages, total] = await Promise.all([
        prisma.village.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { location: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.village.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { location: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
        }),
      ]);
      const totalPages = Math.ceil(total / limit);
      logger.info(`[VILLAGE_SERVICE] : Found ${villages.length} villages matching query "${query}" (page ${page}/${totalPages})`);
      return {
        villages: villages as Village[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[VILLAGE_SERVICE] : Error searching villages:', error);
      throw error;
    }
  }
}

export default new VillageService();
