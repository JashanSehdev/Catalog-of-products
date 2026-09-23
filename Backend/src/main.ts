import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import CookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.use(CookieParser)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )
  await app.listen(process.env.PORT ?? 3001);
  app.enableCors();
}
await bootstrap();
