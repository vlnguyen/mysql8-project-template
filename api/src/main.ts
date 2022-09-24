import * as session from 'express-session';
import * as Redis from 'redis';
import * as connectRedis from 'connect-redis';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // TODO: load config from environment
  const RedisStore = connectRedis(session);
  const redisClient = Redis.createClient({
    socket: { port: 6379, host: 'localhost' },
    password: 'redispassword',
    legacyMode: true,
  });

  redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'sesionsecret',
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
