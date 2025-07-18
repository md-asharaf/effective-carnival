import {db as prisma} from '@/config/database';
import { CreateUser, UpdateUser, User } from '@/@types/schema';
import { logger } from '@/config/logger';

interface GetAllUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  includeRelations?: boolean;
}

class UserService {
  async createUser(data: CreateUser): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      });

      logger.info(`[USER_SERVICE] : User created with ID: ${user.id}`);
      return user as User;
    } catch (error) {
      logger.error('[USER_SERVICE] : Error creating user:', error);
      throw error;
    }
  }

  async getUserById(id: string, includeRelations: boolean = false): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: includeRelations ? {
          hosts: true,
          vendors: true,
          reviews: true,
          bookings: true,
        } : undefined,
      });

      if (!user) {
        logger.warn(`[USER_SERVICE] : User not found with ID: ${id}`);
        return null;
      }

      logger.info(`[USER_SERVICE] : User retrieved with ID: ${id}`);
      return user as User;
    } catch (error) {
      logger.error('[USER_SERVICE] : Error retrieving user:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        logger.warn(`[USER_SERVICE] : User not found with email: ${email}`);
        return null;
      }

      logger.info(`[USER_SERVICE] : User retrieved with email: ${email}`);
      return user as User;
    } catch (error) {
      logger.error('[USER_SERVICE] : Error retrieving user by email:', error);
      throw error;
    }
  }

  async getUserByPhone(phone: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { phone },
      });

      if (!user) {
        logger.warn(`[USER_SERVICE] : User not found with phone: ${phone}`);
        return null;
      }

      logger.info(`[USER_SERVICE] : User retrieved with phone: ${phone}`);
      return user as User;
    } catch (error) {
      logger.error('[USER_SERVICE] : Error retrieving user by phone:', error);
      throw error;
    }
  }

  async getAllUsers(options: GetAllUsersOptions): Promise<{ users: User[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const { page = 1, limit = 10, search, includeRelations = false } = options;
      const skip = (page - 1) * limit;

      const whereClause = search ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ],
      } : {};

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            hosts: true,
            vendors: true,
            reviews: true,
            bookings: true,
          } : undefined,
        }),
        prisma.user.count({ where: whereClause }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[USER_SERVICE] : Retrieved ${users.length} users (page ${page}/${totalPages})`);
      return {
        users: users as User[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[USER_SERVICE] : Error retrieving users:', error);
      throw error;
    }
  }

  async getUsersByIds(ids: string[], includeRelations: boolean = false): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({
        where: { id: { in: ids } },
        include: includeRelations ? {
          hosts: true,
          vendors: true,
          reviews: true,
          bookings: true,
        } : undefined,
      });

      logger.info(`[USER_SERVICE] : Retrieved ${users.length} users by IDs`);
      return users as User[];
    } catch (error) {
      logger.error('[USER_SERVICE] : Error retrieving users by IDs:', error);
      throw error;
    }
  }

  async updateUser(id: string, data: UpdateUser): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      });

      logger.info(`[USER_SERVICE] : User updated with ID: ${id}`);
      return user as User;
    } catch (error) {
      logger.error('[USER_SERVICE] : Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });

      logger.info(`[USER_SERVICE] : User deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[USER_SERVICE] : Error deleting user:', error);
      throw error;
    }
  }

  async searchUsers(query: string, page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { email: { contains: query } },
              { phone: { contains: query } },
            ],
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({
          where: {
            OR: [
              { name: { contains: query } },
              { email: { contains: query } },
              { phone: { contains: query } },
            ],
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[USER_SERVICE] : Found ${users.length} users matching query "${query}" (page ${page}/${totalPages})`);
      return {
        users: users as User[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[USER_SERVICE] : Error searching users:', error);
      throw error;
    }
  }
}

export default new UserService();
