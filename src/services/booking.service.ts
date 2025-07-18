import { db as prisma } from '@/config/database';
import { CreateBooking, UpdateBooking, Booking } from '@/@types/schema';
import { logger } from '@/config/logger';

class BookingService {
  async createBooking(userId: string, data: CreateBooking): Promise<Booking> {
    try {
      const booking = await prisma.booking.create({
        data: {
          userId,
          roomId: data.roomId,
          startDate: data.startDate,
          endDate: data.endDate,
          totalPrice: data.totalPrice,
          status: data.status || 'pending',
        },
      });

      logger.info(`[BOOKING_SERVICE] : Booking created with ID: ${booking.id}`);
      return booking as Booking;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error creating booking:', error);
      throw error;
    }
  }

  async getBookingById(id: string, includeRelations: boolean = false): Promise<Booking | null> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
        include: includeRelations ? {
          user: true,
          room: true,
        } : undefined,
      });

      if (!booking) {
        logger.warn(`[BOOKING_SERVICE] : Booking not found with ID: ${id}`);
        return null;
      }

      logger.info(`[BOOKING_SERVICE] : Booking retrieved with ID: ${id}`);
      return booking as Booking;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error retrieving booking:', error);
      throw error;
    }
  }

  async getBookingsByUserId(userId: string, page: number = 1, limit: number = 10, includeRelations: boolean = false): Promise<{ bookings: Booking[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where: { userId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            room: true,
            user: true
          } : undefined,
        }),
        prisma.booking.count({
          where: { userId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[BOOKING_SERVICE] : Retrieved ${bookings.length} bookings for user ID: ${userId} (page ${page}/${totalPages})`);
      return {
        bookings: bookings as Booking[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error retrieving bookings by user ID:', error);
      throw error;
    }
  }

  async getBookingsByRoomId(roomId: string, page: number = 1, limit: number = 10, includeRelations: boolean = false): Promise<{ bookings: Booking[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where: { roomId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            room: true,
            user: true
          } : undefined
        }),
        prisma.booking.count({
          where: { roomId },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[BOOKING_SERVICE] : Retrieved ${bookings.length} bookings for room ID: ${roomId} (page ${page}/${totalPages})`);
      return {
        bookings: bookings as Booking[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error retrieving bookings by room ID:', error);
      throw error;
    }
  }

  async getAllBookings(options: { page?: number; limit?: number; status?: string; includeRelations?: boolean }): Promise<{ bookings: Booking[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const { page = 1, limit = 10, status, includeRelations = false } = options;
      const skip = (page - 1) * limit;

      const whereClause = status ? { status } : {};

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: includeRelations ? {
            user: true,
            room: true,
          } : undefined,
        }),
        prisma.booking.count({ where: whereClause }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[BOOKING_SERVICE] : Retrieved ${bookings.length} bookings (page ${page}/${totalPages})`);
      return {
        bookings: bookings as Booking[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error retrieving all bookings:', error);
      throw error;
    }
  }

  async updateBooking(id: string, data: UpdateBooking): Promise<Booking | null> {
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          userId: data.userId,
          roomId: data.roomId,
          startDate: data.startDate,
          endDate: data.endDate,
          totalPrice: data.totalPrice,
          status: data.status,
        },
      });

      logger.info(`[BOOKING_SERVICE] : Booking updated with ID: ${id}`);
      return booking as Booking;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error updating booking:', error);
      throw error;
    }
  }

  async updateBookingById(userId: string, id: string, data: UpdateBooking): Promise<Booking | null> {
    try {
      const booking = await prisma.booking.update({
        where: { id, userId },
        data: {
          roomId: data.roomId,
          startDate: data.startDate,
          endDate: data.endDate,
          totalPrice: data.totalPrice,
          status: data.status,
        },
      });

      logger.info(`[BOOKING_SERVICE] : Booking updated with ID: ${id}`);
      return booking as Booking;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error updating booking:', error);
      throw error;
    }
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | null> {
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: { status },
      });

      logger.info(`[BOOKING_SERVICE] : Booking status updated with ID: ${id}`);
      return booking as Booking;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error updating booking status:', error);
      throw error;
    }
  }

  async getUserBookings(userId: string, options: { page?: number; limit?: number; includeRelations?: boolean }): Promise<{ bookings: Booking[]; total: number; page: number; limit: number; totalPages: number }> {
    const { page = 1, limit = 10, includeRelations = false } = options;
    return this.getBookingsByUserId(userId, page, limit,includeRelations);
  }

  async getRoomBookings(roomId: string, options: { page?: number; limit?: number; includeRelations?: boolean }): Promise<{ bookings: Booking[]; total: number; page: number; limit: number; totalPages: number }> {
    const { page = 1, limit = 10, includeRelations = false } = options;
    return this.getBookingsByRoomId(roomId, page, limit,includeRelations);
  }

  async checkRoomAvailability(roomId: string, startDate: Date, endDate: Date): Promise<boolean> {
    try {
      const conflictingBookings = await prisma.booking.findMany({
        where: {
          roomId,
          OR: [
            {
              startDate: { lte: startDate },
              endDate: { gte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
            {
              startDate: { gte: startDate },
              endDate: { lte: endDate },
            },
          ],
        },
      });

      return conflictingBookings.length === 0;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error checking room availability:', error);
      throw error;
    }
  }

  async deleteBooking(id: string): Promise<boolean> {
    try {
      await prisma.booking.delete({
        where: { id },
      });

      logger.info(`[BOOKING_SERVICE] : Booking deleted with ID: ${id}`);
      return true;
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error deleting booking:', error);
      throw error;
    }
  }

  async cancelBooking(userId: string, id: string): Promise<{ message: string; success: boolean }> {
    try {
      await prisma.booking.update({
        where: { id, userId },
        data: { status: 'cancelled' },
      });

      logger.info(`[BOOKING_SERVICE] : Booking cancelled with ID: ${id}`);
      return { message: 'Booking cancelled successfully', success: true };
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error cancelling booking:', error);
      return { message: 'Failed to cancel booking', success: false };
    }
  }

  async getBookingsByStatus(status: string, page: number = 1, limit: number = 10): Promise<{ bookings: Booking[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where: { status },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.booking.count({
          where: { status },
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      logger.info(`[BOOKING_SERVICE] : Retrieved ${bookings.length} bookings with status: ${status} (page ${page}/${totalPages})`);
      return {
        bookings: bookings as Booking[],
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      logger.error('[BOOKING_SERVICE] : Error retrieving bookings by status:', error);
      throw error;
    }
  }
}

export default new BookingService();
