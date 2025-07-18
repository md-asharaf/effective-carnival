import { EmailInterface } from "@/@types/interface";
import { redis } from "@/config/database";
import mailService from "@/services/email.service";

export async function generateOTP(): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

export async function sendOtp(email: string) {
    const otp = await generateOTP();
    try {
        const success = await redis.setValue(`otp:${email}`, otp, 5 * 60);
        if (success) {
            const mailOptions: EmailInterface = {
                subject: "Your OTP Code",
                to: email,
                text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
            };
            // send mail
            await mailService.sendEmail(mailOptions);
            return {
                status: "success",
                message: "OTP sent successfully",
                otp: otp,
            };
        }
        return {
            status: "error",
            message: "Failed to Set OTP in Redis",
        };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return {
            status: "error",
            message: "Failed to send OTP",
        };
    }
}

export async function validateOtp(email: string, otp: string) {
    try {
        const storedOtp = await redis.getValue(`otp:${email}`);
        console.log(storedOtp, otp)
        if (storedOtp === otp) {
            await redis.deleteValue(`otp:${email}`);
            return {
                status: "success",
                message: "OTP validated successfully",
            };
        }
        return {
            status: "error",
            message: "Invalid OTP",
        };
    } catch (error) {
        console.error("Error validating OTP:", error);
        return {
            status: "error",
            message: "Failed to validate OTP",
        };
    }
}
