import Redis from 'ioredis';
import envVars from '@/config/envVars';

class RedisService {
  private client: Redis;

  constructor() {
    if (envVars.REDIS_URL) {
      this.client = new Redis(envVars.REDIS_URL);
    } else {
      this.client = new Redis({
        host: envVars.REDIS_HOST,
        port: envVars.REDIS_PORT,
        db: envVars.REDIS_DB,
      });
    }
  }

  async setValue(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
      return true;
    } catch (error) {
      console.error('Redis setValue error:', error);
      return false;
    }
  }

  async getValue(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async deleteValue(key: string) {
    await this.client.del(key);
  }
}

export default RedisService;