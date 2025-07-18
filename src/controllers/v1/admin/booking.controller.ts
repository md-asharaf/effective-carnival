import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import bookingService from "@/services/booking.service";

/**
 * Get all bookings (admin view)
 * GET /api/v1/admin/bookings
 */
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const { page = "1", limit = "10", status, includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await bookingService.getAllBookings({
        page: pageNum,
        limit: limitNum,
        status: status as string,
        includeRelations: includeRelations === "true",
    });

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get a specific booking by ID (admin view)
 * GET /api/v1/admin/bookings/:bookingId
 */
const getBookingById = catchAsync(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const { includeRelations = "true" } = req.query;

    const booking = await bookingService.getBookingById(
        bookingId,
        includeRelations === "true"
    );

    if (!booking) {
        throw new APIError(404, "Booking not found");
    }

    res.status(200).json({
        status: "success",
        data: booking,
    });
});

/**
 * Update booking status (admin only)
 * PATCH /api/v1/admin/bookings/:bookingId/status
 */
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status) {
        throw new APIError(400, "Status is required");
    }

    const booking = await bookingService.updateBookingStatus(bookingId, status);

    res.status(200).json({
        status: "success",
        data: booking,
    });
});

/**
 * Get bookings for a specific room (admin view)
 * GET /api/v1/admin/bookings/room/:roomId
 */
const getRoomBookings = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const { page = "1", limit = "10", includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await bookingService.getRoomBookings(roomId, {
        page: pageNum,
        limit: limitNum,
        includeRelations: includeRelations === "true",
    });

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Get bookings for a specific user (admin view)
 * GET /api/v1/admin/bookings/user/:userId
 */
const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { page = "1", limit = "10", includeRelations = "true" } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new APIError(400, "Invalid pagination parameters");
    }

    const result = await bookingService.getUserBookings(userId, {
        page: pageNum,
        limit: limitNum,
        includeRelations: includeRelations === "true",
    });

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Check room availability (admin view)
 * GET /api/v1/admin/bookings/availability/:roomId
 */
const checkRoomAvailability = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        throw new APIError(400, "Start date and end date are required");
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new APIError(400, "Invalid date format");
    }

    const availability = await bookingService.checkRoomAvailability(roomId, start, end);

    res.status(200).json({
        status: "success",
        data: availability,
    });
});

export default {
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    getRoomBookings,
    getUserBookings,
    checkRoomAvailability,
}; 