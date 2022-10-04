import * as session from 'express-session';
import * as Redis from 'redis';
import * as connectRedis from 'connect-redis';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('api');

  // TODO: load config from environment
  const RedisStore = connectRedis(session);
  const redisClient = Redis.createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
    password: process.env.REDIS_PASSWORD || 'redispassword',
    legacyMode: true,
  });

  redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET || 'sessionsecret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000, // 1 hour
      },
    }),
  );

  await app.listen(8080);
}
bootstrap();
