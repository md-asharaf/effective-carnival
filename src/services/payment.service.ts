import {
    RazorpayConfig,
    CreateOrderRequest,
    PaymentOrderResponse,
    PaymentVerificationRequest,
    PaymentVerificationResponse,
} from "@/@types/payment";
import envVars from "@/config/envVars";
import { logger } from "@/config/logger";
import { APIError } from "@/utils/APIError";
import Razorpay from "razorpay";
import crypto from "crypto";

class RazorpayService {
    private razorpay: Razorpay;
    private config: RazorpayConfig;

    constructor(config: RazorpayConfig) {
        this.config = config;
        this.razorpay = new Razorpay({
            key_id: config.keyId,
            key_secret: config.keySecret,
        });
    }

    /**
     * Create a new payment order
     */
    async createOrder(orderData: CreateOrderRequest): Promise<PaymentOrderResponse> {
        try {
            const options = {
                amount: orderData.amount * 100, // Razorpay expects amount in paise
                currency: orderData.currency || "INR",
                receipt: orderData.receipt,
                notes: orderData.notes || {},
            };

            const order = await this.razorpay.orders.create(options);

            logger.info(`[PAYMENT_SERVICE] Order created successfully: ${order.id}`);

            return {
                id: order.id,
                entity: order.entity,
                amount: Number(order.amount),
                amount_paid: Number(order.amount_paid),
                amount_due: Number(order.amount_due),
                currency: order.currency || "INR",
                receipt: order.receipt || "",
                status: order.status,
                attempts: order.attempts,
                notes: (order.notes as Record<string, string>) || {},
                created_at: order.created_at,
            };
        } catch (error: any) {
            logger.error("[PAYMENT_SERVICE] Error creating order:", error);
            throw new APIError(500, `Failed to create payment order: ${error.message}`);
        }
    }

    /**
     * Verify payment signature
     */
    async verifyPayment(
        verificationData: PaymentVerificationRequest
    ): Promise<PaymentVerificationResponse> {
        try {
            const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            } = verificationData;

            // Create the signature string
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            
            // Generate expected signature
            const expectedSignature = crypto
                .createHmac("sha256", this.config.keySecret)
                .update(body.toString())
                .digest("hex");

            // Compare signatures
            const isAuthentic = expectedSignature === razorpay_signature;

            if (!isAuthentic) {
                throw new APIError(400, "Invalid payment signature");
            }

            // Get payment details from Razorpay
            const payment = await this.razorpay.payments.fetch(razorpay_payment_id);

            logger.info(`[PAYMENT_SERVICE] Payment verified successfully: ${razorpay_payment_id}`);

            return {
                verified: true,
                payment_id: payment.id,
                order_id: payment.order_id,
                amount: Number(payment.amount),
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                captured: payment.captured,
                description: payment.description || undefined,
                email: payment.email || undefined,
                contact: String(payment.contact || ""),
                created_at: payment.created_at,
            };
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error("[PAYMENT_SERVICE] Error verifying payment:", error);
            throw new APIError(500, `Failed to verify payment: ${error.message}`);
        }
    }

    /**
     * Verify webhook signature
     */
    verifyWebhookSignature(
        body: string,
        signature: string,
        webhookSecret: string
    ): boolean {
        try {
            const expectedSignature = crypto
                .createHmac("sha256", webhookSecret)
                .update(body)
                .digest("hex");

            return expectedSignature === signature;
        } catch (error) {
            logger.error("[PAYMENT_SERVICE] Error verifying webhook signature:", error);
            return false;
        }
    }

    /**
     * Process webhook payload and extract payment status update
     */
    processWebhookPayload(payload: any): {
        event: string;
        payment_id: string;
        order_id: string;
        payment_status: string;
        order_status: string;
        amount: number;
        currency: string;
        method: string;
        email?: string;
        contact?: string;
        created_at: number;
    } | null {
        try {
            const { event, payload: webhookData } = payload;

            // Handle payment events
            if (webhookData.payment && webhookData.payment.entity) {
                const payment = webhookData.payment.entity;
                const order = webhookData.order?.entity;

                return {
                    event,
                    payment_id: payment.id,
                    order_id: payment.order_id,
                    payment_status: payment.status,
                    order_status: order?.status || "unknown",
                    amount: Number(payment.amount),
                    currency: payment.currency,
                    method: payment.method,
                    email: payment.email || undefined,
                    contact: String(payment.contact || ""),
                    created_at: payment.created_at,
                };
            }

            // Handle order events
            if (webhookData.order && webhookData.order.entity) {
                const order = webhookData.order.entity;

                return {
                    event,
                    payment_id: "unknown",
                    order_id: order.id,
                    payment_status: "unknown",
                    order_status: order.status,
                    amount: Number(order.amount),
                    currency: order.currency,
                    method: "unknown",
                    created_at: order.created_at,
                };
            }

            logger.warn("[PAYMENT_SERVICE] Unknown webhook payload structure:", payload);
            return null;
        } catch (error) {
            logger.error("[PAYMENT_SERVICE] Error processing webhook payload:", error);
            return null;
        }
    }

    /**
     * Handle payment status update from webhook
     */
    async handlePaymentStatusUpdate(webhookEvent: any): Promise<{
        success: boolean;
        message: string;
        event_data?: any;
    }> {
        try {
            // Verify webhook signature first
            const signature = webhookEvent.headers?.["x-razorpay-signature"];
            const body = JSON.stringify(webhookEvent.body);
            
            if (!this.verifyWebhookSignature(body, signature, this.config.webhookSecret)) {
                throw new APIError(400, "Invalid webhook signature");
            }

            // Process the webhook payload
            const eventData = this.processWebhookPayload(webhookEvent.body);
            
            if (!eventData) {
                throw new APIError(400, "Invalid webhook payload");
            }

            logger.info(`[PAYMENT_SERVICE] Processing webhook event: ${eventData.event} for payment: ${eventData.payment_id}`);

            // Handle different event types
            switch (eventData.event) {
                case "payment.captured":
                    await this.handlePaymentCaptured(eventData);
                    break;
                case "payment.failed":
                    await this.handlePaymentFailed(eventData);
                    break;
                case "order.paid":
                    await this.handleOrderPaid(eventData);
                    break;
                case "payment.authorized":
                    await this.handlePaymentAuthorized(eventData);
                    break;
                default:
                    logger.info(`[PAYMENT_SERVICE] Unhandled webhook event: ${eventData.event}`);
            }

            return {
                success: true,
                message: `Webhook event ${eventData.event} processed successfully`,
                event_data: eventData,
            };
        } catch (error: any) {
            if (error instanceof APIError) {
                throw error;
            }
            logger.error("[PAYMENT_SERVICE] Error handling payment status update:", error);
            throw new APIError(500, `Failed to process webhook: ${error.message}`);
        }
    }

    /**
     * Handle payment captured event
     */
    private async handlePaymentCaptured(eventData: any): Promise<void> {
        logger.info(`[PAYMENT_SERVICE] Payment captured: ${eventData.payment_id}`);
        // TODO: Update your database with payment captured status
        // Example: await updatePaymentStatus(eventData.payment_id, 'captured');
    }

    /**
     * Handle payment failed event
     */
    private async handlePaymentFailed(eventData: any): Promise<void> {
        logger.info(`[PAYMENT_SERVICE] Payment failed: ${eventData.payment_id}`);
        // TODO: Update your database with payment failed status
        // Example: await updatePaymentStatus(eventData.payment_id, 'failed');
    }

    /**
     * Handle order paid event
     */
    private async handleOrderPaid(eventData: any): Promise<void> {
        logger.info(`[PAYMENT_SERVICE] Order paid: ${eventData.order_id}`);
        // TODO: Update your database with order paid status
        // Example: await updateOrderStatus(eventData.order_id, 'paid');
    }

    /**
     * Handle payment authorized event
     */
    private async handlePaymentAuthorized(eventData: any): Promise<void> {
        logger.info(`[PAYMENT_SERVICE] Payment authorized: ${eventData.payment_id}`);
        // TODO: Update your database with payment authorized status
        // Example: await updatePaymentStatus(eventData.payment_id, 'authorized');
    }
}

// Initialize Razorpay service with environment variables
const razorpayService = new RazorpayService({
    keyId: envVars.RAZORPAY_KEY_ID,
    keySecret: envVars.RAZORPAY_KEY_SECRET,
    webhookSecret: envVars.RAZORPAY_WEBHOOK_SECRET,
});

export default razorpayService;
