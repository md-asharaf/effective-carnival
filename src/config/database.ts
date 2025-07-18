import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";
import RedisService from "@/services/redis.service";

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
  redis: RedisService;
}

declare const global: CustomNodeJsGlobal;

export const db = global.prisma || new PrismaClient();

db.$connect()
  .then(() => {
    logger.info("[PRISMA] : connected to database");
  })
  .catch((error: string) => {
    logger.error("[PRISMA] : failed to connect to database : ", error);
  });

export const redis = global.redis || new RedisService();