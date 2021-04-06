import IORedis from 'ioredis';
import { redis } from '../redis';
import { EmailType } from '../types/EmailType';

export class RedisEmailRepo {
  private static redis = redis;

  private static getKey(type: EmailType, token: string) {
    return `${type}:${token}`;
  }

  static setItem(type: EmailType, token: string, value: IORedis.ValueType) {
    const redisKey = this.getKey(type, token);
    return this.redis.set(redisKey, value, 'ex', 60 * 60 * 24);
  }

  static getItem(type: EmailType, token: string) {
    return this.redis.get(this.getKey(type, token));
  }

  static removeItem(type: EmailType, token: string) {
    return this.redis.del(this.getKey(type, token));
  }
}
