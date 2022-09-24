import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: 'sesionsecret',
      resave: false,
      saveUninitialized: true,
      name: 'connect.sid',
      cookie: {
        maxAge: 3600000, // 1 hour
      },
    }),
  );

  await app.listen(8080);
}
bootstrap();
