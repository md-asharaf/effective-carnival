import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { logger } from "./logger";
import RedisService from "@/services/redis.service";
import * as schema from "@/db/schema";
import envVars from "./envVars";

interface CustomNodeJsGlobal {
    db: ReturnType<typeof drizzle<typeof schema>>;
    redis: RedisService;
}

declare const global: CustomNodeJsGlobal;

// Create Neon connection
const sql = neon(envVars.DATABASE_URL!);

// Create Drizzle instance
export const db = global.db || drizzle(sql, { schema });

// Test database connection
(async () => {
    try {
        await sql`SELECT 1`;
        logger.info("[DRIZZLE] : connected to Neon database");
    } catch (error) {
        logger.error("[DRIZZLE] : failed to connect to Neon database : ", error);
    }
})();

export const redis = global.redis || new RedisService();

// Assign to global to prevent multiple instances
if (!global.db) {
    global.db = db;
}

if (!global.redis) {
    global.redis = redis;
}
