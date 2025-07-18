import {db as prisma} from '@/config/database';
import { CreateAdmin, UpdateAdmin, Admin } from '@/@types/schema';
import { logger } from '@/config/logger';

class AdminService {
  async createAdmin(data: CreateAdmin): Promise<Admin> {
    try {
      const admin = await prisma.admin.create({
        data: {
          email: data.email,
        },
      });

      logger.info(`[ADMIN_SERVICE] : Admin created with ID: ${admin.id}`);
      return admin as Admin;
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error creating admin:', error);
      throw error;
    }
  }

  async getAdminById(id: string): Promise<Admin | null> {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
      });

      if (!admin) {
        logger.warn(`[ADMIN_SERVICE] : Admin not found with ID: ${id}`);
        return null;
      }

      logger.info(`[ADMIN_SERVICE] : Admin retrieved with ID: ${id}`);
      return admin as Admin;
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error retrieving admin:', error);
      throw error;
    }
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    try {
      const admin = await prisma.admin.findUnique({
        where: { email },
      });

      if (!admin) {
        logger.warn(`[ADMIN_SERVICE] : Admin not found with email: ${email}`);
        return null;
      }

      logger.info(`[ADMIN_SERVICE] : Admin retrieved with email: ${email}`);
      return admin as Admin;
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error retrieving admin by email:', error);
      throw error;
    }
  }

  async adminExists(email: string): Promise<boolean> {
    try {
      const admin = await prisma.admin.findUnique({
        where: { email },
      });

      const exists = !!admin;
      logger.info(`[ADMIN_SERVICE] : Admin exists check for ${email}: ${exists}`);
      return exists;
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error checking admin existence:', error);
      throw error;
    }
  }

  async getAllAdmins(page: number = 1, limit: number = 10): Promise<{ admins: Admin[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [admins, total] = await Promise.all([
        prisma.admin.findMany({
          skip,
          take: limit,
          orderBy: { id: 'asc' },
        }),
        prisma.admin.count(),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[ADMIN_SERVICE] : Retrieved ${admins.length} admins (page ${page}/${totalPages})`);
      return {
        admins: admins as Admin[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error retrieving admins:', error);
      throw error;
    }
  }

  async updateAdmin(id: string, data: UpdateAdmin): Promise<Admin | null> {
    try {
      const admin = await prisma.admin.update({
        where: { id },
        data: {
          email: data.email,
        },
      });

      logger.info(`[ADMIN_SERVICE] : Admin updated with ID: ${id}`);
      return admin as Admin;
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error updating admin:', error);
      throw error;
    }
  }

  async deleteAdmin(id: string): Promise<boolean> {
    try {
      await prisma.admin.delete({
        where: { id },
      });

      logger.info(`[ADMIN_SERVICE] : Admin deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[ADMIN_SERVICE] : Error deleting admin:', error);
      throw error;
    }
  }
}

export default new AdminService();
