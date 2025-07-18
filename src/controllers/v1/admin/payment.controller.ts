import { Request, Response } from "express";
import catchAsync from "@/handlers/async.handler";

import paymentService from "@/services/payment.service";

/**
 * Handle webhook (admin view)
 * POST /api/v1/admin/payments/webhook
 */
const handleWebhook = catchAsync(async (req: Request, res: Response) => {
    const result = await paymentService.handlePaymentStatusUpdate(req);

    res.status(200).json({
        status: "success",
        data: result,
    });
});

export default {
    handleWebhook,
}; 