import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  private client: RedisClientType;

  constructor(private configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    console.log('Connecting to Redis at:', redisUrl, process.env.REDIS_URL);
    this.client = createClient({
      url: redisUrl,
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.client.on('error', (err) => {
      console.error('Redis error: ', err);
    });
  }

  // Ensure the Redis client is connected before using it
  async onModuleInit() {
    await this.client.connect();
  }

  // Get value from Redis
  async getCache(): Promise<string | null> {
    try {
      console.log('Hello World from Valkey Redis');
      await this.client.set('test', 'Hello World from Valkey Redis');
      return await this.client.get('test');
    } catch (err) {
      throw new Error(`Failed to get value from Redis: ${err}`);
    }
  }

  async setCache(key: string, value: string): Promise<string> {
    try {
      console.log('Hello World from Valkey Redis 1');
      return await this.client.set(key, value);
    } catch (err) {
      throw new Error(`Failed to set value in Redis: ${err}`);
    }
  }
  async getCacheByKey(key: string): Promise<string | null> {
    try {
      console.log('Hello World from Valkey Redis 3');
      return await this.client.get(key);
    } catch (err) {
      throw new Error(`Failed to get value from Redis: ${err}`);
    }
  }
  // Optionally, you could add a method to close the Redis connection gracefully
  async onModuleDestroy() {
    await this.client.quit();
  }
}
