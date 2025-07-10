import { logger } from "@/config/logger";
import { EmailInterface } from "@/@types/interface";
import envVars from "@/config/envVars";
import { Resend } from "resend";

class MailService {
    private client: Resend;
    constructor(apiKey: string) {
        this.client = new Resend(apiKey);
    }
    public async sendEmail(options: EmailInterface): Promise<void> {
        try {
            const { to, subject, text, html } = options;
            const from = "onboarding@resend.dev";

            await this.client.emails.send({
                from,
                to: [to],
                subject,
                ...(text ? { text } : {}),
                ...(html ? { html } : {}),
            } as any);
            logger.info(`[EMAIL] Sent email to ${to}`);
        } catch (error: any) {
            logger.error(`[EMAIL] Failed to send email: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

const mailService = new MailService(envVars.RESEND_API_KEY);

export default mailService;