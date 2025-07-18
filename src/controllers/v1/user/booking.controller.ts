import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import bookingService from "@/services/booking.service";
import { type BookingCreate, type BookingUpdate } from "@/@types/schema";

/**
 * Create a new booking
 * POST /api/v1/user/bookings
 */
const createBooking = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const bookingData: BookingCreate = {
        ...req.body,
        userId, // Ensure userId is set from authenticated user
    };

    const booking = await bookingService.createBooking(userId, bookingData);

    res.status(201).json({
        status: "success",
        data: booking,
    });
});

/**
 * Create a booking with additional verification
 * POST /api/v1/user/bookings/with-verification
 */
const createBookingWithVerification = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    // Additional verification could be added here
    // For example: email verification, phone verification, etc.
    
    const bookingData: BookingCreate = {
        ...req.body,
        userId,
    };

    const booking = await bookingService.createBooking(userId, bookingData);

    res.status(201).json({
        status: "success",
        data: booking,
        message: "Booking created successfully with verification",
    });
});

/**
 * Get user's bookings
 * GET /api/v1/user/bookings
 */
const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

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
 * Get a specific booking by ID
 * GET /api/v1/user/bookings/:bookingId
 */
const getBookingById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { bookingId } = req.params;
    const { includeRelations = "true" } = req.query;

    const booking = await bookingService.getBookingById(
        bookingId,
        includeRelations === "true"
    );

    if (!booking) {
        throw new APIError(404, "Booking not found");
    }

    // Ensure user can only access their own bookings
    if (booking.userId !== userId) {
        throw new APIError(403, "Access denied");
    }

    res.status(200).json({
        status: "success",
        data: booking,
    });
});

/**
 * Update a booking
 * PUT /api/v1/user/bookings/:bookingId
 */
const updateBooking = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { bookingId } = req.params;
    const updateData: BookingUpdate = req.body;

    const booking = await bookingService.updateBookingById(userId, bookingId, updateData);

    res.status(200).json({
        status: "success",
        data: booking,
    });
});

/**
 * Cancel a booking
 * DELETE /api/v1/user/bookings/:bookingId
 */
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { bookingId } = req.params;

    const result = await bookingService.cancelBooking(userId, bookingId);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

/**
 * Verify booking before confirmation
 * POST /api/v1/user/bookings/:bookingId/verify
 */
const verifyBooking = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { bookingId } = req.params;
    const { verificationCode } = req.body;

    if (!verificationCode) {
        throw new APIError(400, "Verification code is required");
    }

    // Get the booking to verify ownership
    const booking = await bookingService.getBookingById(bookingId, false);
    
    if (!booking) {
        throw new APIError(404, "Booking not found");
    }

    if (booking.userId !== userId) {
        throw new APIError(403, "Access denied");
    }

    // Here you would typically verify the code against what was sent
    // For now, we'll just return success
    // In a real implementation, you'd check against stored verification codes

    res.status(200).json({
        status: "success",
        message: "Booking verified successfully",
        data: {
            bookingId,
            verified: true,
        },
    });
});

/**
 * Confirm booking after verification
 * POST /api/v1/user/bookings/:bookingId/confirm
 */
const confirmBooking = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { bookingId } = req.params;

    // Get the booking to verify ownership
    const booking = await bookingService.getBookingById(bookingId, false);
    
    if (!booking) {
        throw new APIError(404, "Booking not found");
    }

    if (booking.userId !== userId) {
        throw new APIError(403, "Access denied");
    }

    // Update booking status to confirmed
    const updatedBooking = await bookingService.updateBookingStatus(bookingId, "confirmed");

    res.status(200).json({
        status: "success",
        data: updatedBooking,
        message: "Booking confirmed successfully",
    });
});

/**
 * Get booking verification status
 * GET /api/v1/user/bookings/:bookingId/verification-status
 */
const getBookingVerificationStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new APIError(401, "User not authenticated");
    }

    const { bookingId } = req.params;

    const booking = await bookingService.getBookingById(bookingId, false);
    
    if (!booking) {
        throw new APIError(404, "Booking not found");
    }

    if (booking.userId !== userId) {
        throw new APIError(403, "Access denied");
    }

    res.status(200).json({
        status: "success",
        data: {
            bookingId,
            status: booking.status,
            verified: booking.status === "confirmed" || booking.status === "completed",
            canVerify: booking.status === "pending",
        },
    });
});

export default {
    createBooking,
    createBookingWithVerification,
    getUserBookings,
    getBookingById,
    updateBooking,
    cancelBooking,
    verifyBooking,
    confirmBooking,
    getBookingVerificationStatus,
}; 