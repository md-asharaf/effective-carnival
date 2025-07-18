import { QuerySchema } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import bookingService from "@/services/booking.service";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";
import { z } from "zod";

/**
 * Get booking by ID (public)
 * GET /api/v1/public/bookings/:id
 */
const getBookingById = catchAsync(async (req: Request, res: Response) => {
    const { id: bookingId } = req.params;
    if (!bookingId) {
        throw new APIError(400, "Booking ID is required");
    }
    const query = req.query;
    try {
        const { includeRelations } = QuerySchema.parse(query);
        const booking = await bookingService.getBookingById(
            bookingId,
            includeRelations
        );
        if (!booking) {
            throw new APIError(404, "Booking not found");
        }
        res.status(200).json({
            data: { booking },
            status: "success",
            message: "Booking retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        if (error instanceof z.ZodError) {
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        throw new APIError(500, error.message);
    }
});

/**
 * Get all bookings with pagination and filtering (public)
 * GET /api/v1/public/bookings
 */
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    try {
        const { page, limit, includeRelations } =
            QuerySchema.parse(query);
        const data = await bookingService.getAllBookings({
            page,
            limit,
            includeRelations,
        });
        res.status(200).json({
            data,
            status: "success",
            message: "Bookings retrieved successfully",
        });
        return;
    } catch (error: any) {
        if (error instanceof APIError) throw error;
        if (error instanceof z.ZodError) {
            throw new APIError(
                400,
                error.errors.map((e) => e.message).join(", ")
            );
        }
        throw new APIError(500, error.message);
    }
});

export default {
    getBookingById,
    getAllBookings,
}; 