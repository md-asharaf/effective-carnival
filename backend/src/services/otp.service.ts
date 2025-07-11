import { redis } from "@/config/database";

/**
 * Generates a 6-digit OTP as a string.
 */
export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Sends an OTP to the given email by storing it in Redis.
 * @param email The email to send the OTP to.
 * @returns An object with status, message, and (on success) the OTP.
 */
export async function sendOtp(email: string) {
    const otp = generateOTP();
    try {
        await redis.setValue(`otp:${email}`, otp, 5 * 60);
        return {
            status: "success",
            message: "OTP sent successfully",
            otp
        };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return {
            status: "error",
            message: "Failed to send OTP"
        };
    }
}

/**
 * Validates the OTP for the given email.
 * @param email The email to validate the OTP for.
 * @param otp The OTP to validate.
 * @returns An object with status and message.
 */
export async function validateOtp(email: string, otp: string) {
    try {
        const storedOtp = await redis.getValue(`otp:${email}`);
        if (!storedOtp) {
            return {
                status: "error",
                message: "OTP expired or not found"
            };
        }
        if (storedOtp === otp) {
            await redis.deleteValue(`otp:${email}`);
            return {
                status: "success",
                message: "OTP validated successfully"
            };
        }
        return {
            status: "error",
            message: "Invalid OTP"
        };
    } catch (error) {
        console.error("Error validating OTP:", error);
        return {
            status: "error",
            message: "Failed to validate OTP"
        };
    }
}