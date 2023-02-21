
import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const db = new Redis({
  host: process.env.REDIS_HOST,
  db: parseInt(process.env.REDIS_DB as string),
  port: parseInt(process.env.REDIS_PORT as string)
});
