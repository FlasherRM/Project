import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("/api/v1")
  app.use(
      session({
        secret: 'QWERTYUIOPASDFGHJKLZXCVBNM',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 120000
        }
      }),
  )
    app.enableCors()
  await app.listen(5000);
}
bootstrap();
