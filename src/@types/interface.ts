import { z } from 'zod';
import { Admin, User, updateUserSchema } from "./schema";

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: Omit<User, "password">,
            admin?: Admin
        }
    }
}

const InterfaceSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1, "Name is required"),
	phone: z.string().optional(),
});
export type registerInterface = z.infer<typeof InterfaceSchema>;

const verifyRegistrationSchema = z.object({
	email: z.string().email(),
	code: z.string().min(1, "Verification code is required"),
})
export type verifyRegistrationInterface = z.infer<typeof verifyRegistrationSchema>;

export const EmailOptionsSchema = z.object({
	to: z.string().email(),
	subject: z.string(),
	text: z.string().optional(),
	html: z.string().optional(),
});

export const sendContactForm = z.object({
	name: z.string(),
	email: z.string(),
	subject: z.string(),
	message: z.string(),
});

export type SendContactFormInterface = z.infer<typeof sendContactForm>;
export type EmailInterface = z.infer<typeof EmailOptionsSchema>;

export const RegisterSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
export type RegisterInterface = z.infer<typeof RegisterSchema>;

export const VerifyRegistrationSchema = z.object({
    email: z.string().email(),
    code: z.string().min(1, "Verification code is required"),
});
export type VerifyRegistrationInterface = z.infer<
    typeof VerifyRegistrationSchema
>;

export const LoginSchema = z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});
export type LoginInterface = z.infer<typeof LoginSchema>;

export const SendContactForm = z.object({
    name: z.string(),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
});

export const UpdateProfileSchema = updateUserSchema;
export const ResetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters"),
    token: z.string().min(1, "Token is required"),
});

export const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters"),
});

export const RefreshTokenSchema = z.object({
    token: z.string().min(1, "Refresh token is required"),
});

export const CreateOrderSchema = z.object({
    totalAmount: z.number().positive("Total amount must be positive"),
    shippingAddressId: z.string().min(1, "Shipping address is required"),
    billingAddressId: z.string().optional(),
    paymentMethod: z.string().optional(),
    phone: z.string().min(1, "Phone number is required"),
});

export type CreateOrderInterface = z.infer<typeof CreateOrderSchema>;

// Query Schema for common query parameters
export const QuerySchema = z.object({
    // Pagination
    page: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().positive().default(1))
        .optional(),
    limit: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().positive().max(100).default(10))
        .optional(),

    // Search and filtering
    search: z.string().optional(),
    status: z.string().optional(),
    rating: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1).max(5))
        .optional(),

    // Relations
    includeRelations: z
        .string()
        .transform((val) => val === "true")
        .default("false")
        .optional(),

    // Sorting
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),

    // Date filtering
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),

    // Category and other filters
    minPrice: z
        .string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive())
        .optional(),
    maxPrice: z
        .string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive())
        .optional(),
});

export const VerifyLoginSchema = VerifyRegistrationSchema;
export const AdminLoginSchema = LoginSchema.omit({ password: true });
export const ForgotPasswordSchema = AdminLoginSchema;
export type ForgotPasswordInterface = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;
export const AdminRegisterSchema = RegisterSchema.omit({ password: true });
export type QueryInterface = z.infer<typeof QuerySchema>;
export type VerifyLoginInterface = z.infer<typeof VerifyLoginSchema>;
export type AdminRegisterInterface = z.infer<typeof AdminRegisterSchema>;
export type AdminLoginInterface = z.infer<typeof AdminLoginSchema>;
export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
export type RefreshTokenInterface = z.infer<typeof RefreshTokenSchema>;
export type ChangePasswordInterface = z.infer<typeof ChangePasswordSchema>;
