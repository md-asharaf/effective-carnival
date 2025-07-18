import { db as prisma } from '@/config/database';
import { CreateRoom, UpdateRoom, Room, RoomWithRelations } from '@/@types/schema';
import { logger } from '@/config/logger';

class RoomService {
  async createRoom(data: CreateRoom): Promise<Room> {
    try {
      const room = await prisma.room.create({
        data: {
          hostId: data.hostId,
          villageId: data.villageId,
          name: data.name,
          description: data.description,
          price: data.price,
          available: data.available || true,
        },
      });

      logger.info(`[ROOM_SERVICE] : Room created with ID: ${room.id}`);
      return room as Room;
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error creating room:', error);
      throw error;
    }
  }

  async getRoomById(id: string, includeRelations: boolean = false): Promise<Room | null> {
    try {
      const room = await prisma.room.findUnique({
        where: { id },
        include: includeRelations ?
          {
            bookings: true,
            host: true,
            images: true,
            reviews: true,
            village: true
          } : undefined
      });

      if (!room) {
        logger.warn(`[ROOM_SERVICE] : Room not found with ID: ${id}`);
        return null;
      }

      logger.info(`[ROOM_SERVICE] : Room retrieved with ID: ${id}`);
      return room as Room;
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error retrieving room:', error);
      throw error;
    }
  }

  async getRoomsByHostId(hostId: string, page: number = 1, limit: number = 10): Promise<{ rooms: Room[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [rooms, total] = await Promise.all([
        prisma.room.findMany({
          where: { hostId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.room.count({
          where: { hostId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[ROOM_SERVICE] : Retrieved ${rooms.length} rooms for host ID: ${hostId} (page ${page}/${totalPages})`);
      return {
        rooms: rooms as Room[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error retrieving rooms by host ID:', error);
      throw error;
    }
  }

  async getRoomsByVillageId(villageId: string, page: number = 1, limit: number = 10): Promise<{ rooms: Room[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [rooms, total] = await Promise.all([
        prisma.room.findMany({
          where: { villageId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.room.count({
          where: { villageId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[ROOM_SERVICE] : Retrieved ${rooms.length} rooms for village ID: ${villageId} (page ${page}/${totalPages})`);
      return {
        rooms: rooms as Room[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error retrieving rooms by village ID:', error);
      throw error;
    }
  }

  async getAllRooms(page: number = 1, limit: number = 10, includeRelations: boolean = true): Promise<{ rooms: Room[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [rooms, total] = await Promise.all([
        prisma.room.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            bookings: true,
            host: true,
            images: true,
            reviews: true,
            village: true
          } : undefined
        }),
        prisma.room.count(),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[ROOM_SERVICE] : Retrieved ${rooms.length} rooms (page ${page}/${totalPages})`);
      return {
        rooms: rooms as Room[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error retrieving all rooms:', error);
      throw error;
    }
  }

  async updateRoom(id: string, data: UpdateRoom): Promise<Room | null> {
    try {
      const room = await prisma.room.update({
        where: { id },
        data: {
          hostId: data.hostId,
          villageId: data.villageId,
          name: data.name,
          description: data.description,
          price: data.price,
          available: data.available,
        },
      });

      logger.info(`[ROOM_SERVICE] : Room updated with ID: ${id}`);
      return room as Room;
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error updating room:', error);
      throw error;
    }
  }

  async deleteRoom(id: string): Promise<boolean> {
    try {
      await prisma.room.delete({
        where: { id },
      });

      logger.info(`[ROOM_SERVICE] : Room deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error deleting room:', error);
      throw error;
    }
  }

  async searchRooms(query: string, page: number = 1, limit: number = 10): Promise<{ rooms: Room[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [rooms, total] = await Promise.all([
        prisma.room.findMany({
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
        prisma.room.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[ROOM_SERVICE] : Found ${rooms.length} rooms matching query "${query}" (page ${page}/${totalPages})`);
      return {
        rooms: rooms as Room[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error searching rooms:', error);
      throw error;
    }
  }

  async getRoomsByIds(ids: string[], includeRelations: boolean = false): Promise<(Room | RoomWithRelations)[]> {
    try {
      const rooms = await prisma.room.findMany({
        where: { id: { in: ids } },
        include: includeRelations ? {
          bookings: true,
          host: true,
          images: true,
          reviews: true,
          village: true
        } : undefined,
      });

      logger.info(`[ROOM_SERVICE] : Retrieved ${rooms.length} rooms by IDs`);
      return rooms as (Room | RoomWithRelations)[];
    } catch (error) {
      logger.error('[ROOM_SERVICE] : Error retrieving rooms by IDs:', error);
      throw error;
    }
  }
}

export default new RoomService();
