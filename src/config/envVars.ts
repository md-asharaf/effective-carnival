import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import { logger } from './logger';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define the environment configuration schema
const EnvConfigSchema = z.object({
  PORT: z.coerce.number({
    required_error: "PORT environment variable is required",
    invalid_type_error: "PORT must be a valid number"
  }).int().positive().default(6379),
  NODE_ENV: z.enum(['development', 'production', 'test'], {
    required_error: "NODE_ENV environment variable is required",
    invalid_type_error: "NODE_ENV must be one of: development, production, test"
  }).default('development'),

  // Database configuration
  DATABASE_URL: z.string({
    required_error: "DATABASE_URL environment variable is required",
    invalid_type_error: "DATABASE_URL must be a string"
  }).url("DATABASE_URL must be a valid URL").optional(),

  // JWT configuration
  JWT_SECRET: z.string({
    required_error: "JWT_SECRET environment variable is required",
    invalid_type_error: "JWT_SECRET must be a string"
  }).min(8, "JWT_SECRET must be at least 8 characters long"),
  RESEND_API_KEY: z.string({
    required_error: "RESEND_API_KEY environment variable is required",
    invalid_type_error: "RESEND_API_KEY must be a string"
  }).min(1, "RESEND_API_KEY can not be empty"),
  // redis config
  REDIS_HOST: z.string({
    required_error: "REDIS_HOST environment variable is required",
    invalid_type_error: "REDIS_HOST must be a string"
  }).default("127.0.0.1"),
  REDIS_PORT: z.coerce.number({
    required_error: "REDIS_PORT environment variable is required",
    invalid_type_error: "REDIS_PORT must be a valid number"
  }).int().positive().default(6379),
  REDIS_DB: z.coerce.number({
    required_error: "REDIS_DB environment variable is required",
    invalid_type_error: "REDIS_DB must be a valid number"
  }).int().nonnegative().default(0),
  REDIS_URL: z.string().optional(),
  
  // Razorpay configuration
  RAZORPAY_KEY_ID: z.string({
    required_error: "RAZORPAY_KEY_ID environment variable is required",
    invalid_type_error: "RAZORPAY_KEY_ID must be a string"
  }).min(1, "RAZORPAY_KEY_ID can not be empty"),
  RAZORPAY_KEY_SECRET: z.string({
    required_error: "RAZORPAY_KEY_SECRET environment variable is required",
    invalid_type_error: "RAZORPAY_KEY_SECRET must be a string"
  }).min(1, "RAZORPAY_KEY_SECRET can not be empty"),
  RAZORPAY_WEBHOOK_SECRET: z.string({
    required_error: "RAZORPAY_WEBHOOK_SECRET environment variable is required",
    invalid_type_error: "RAZORPAY_WEBHOOK_SECRET must be a string"
  }).min(1, "RAZORPAY_WEBHOOK_SECRET can not be empty")
});

// Define the config type using Zod inference
export type EnvConfig = z.infer<typeof EnvConfigSchema>;

// Load raw configuration from environment variables
const rawConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_DB: process.env.REDIS_DB,
  REDIS_URL: process.env.REDIS_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
};

// Validate and parse configuration
let envVars: EnvConfig;

try {
  envVars = EnvConfigSchema.parse(rawConfig);
  logger.info("[ENV] configuration loaded.");
} catch (error) {
  if (error instanceof z.ZodError) {
    logger.error("[ENV] configuration validation failed:", error.errors);
    error.errors.forEach(err => {
      logger.error(`- ${err.path.join('.')}: ${err.message}`);
    });
  } else {
    logger.error("[ENV] Unknown error during environment config validation:", error);
  }

  // Throw error to prevent application from starting with invalid config
  throw new Error("[ENV] Environment configuration validation failed. Check environment variables.");
}

// Export individual config values for convenience
export const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  JWT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_DB,
  REDIS_URL,
  RESEND_API_KEY,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET
} = envVars;

export default envVars;