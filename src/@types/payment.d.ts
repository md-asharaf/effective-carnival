export interface RazorpayConfig {
    keyId: string;
    keySecret: string;
    webhookSecret: string;
}

export interface CreateOrderRequest {
    amount: number;
    currency?: string;
    receipt: string;
    notes?: Record<string, string>;
}

export interface PaymentOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    notes: Record<string, string>;
    created_at: number;
}

export interface PaymentVerificationRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface PaymentVerificationResponse {
    verified: boolean;
    payment_id: string;
    order_id: string;
    amount: number;
    currency: string;
    status: string;
    method: string;
    captured: boolean;
    description?: string;
    email?: string;
    contact?: string;
    created_at: number;
} 