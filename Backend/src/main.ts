import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  await app.listen(process.env.PORT ?? 3001);
  app.enableCors();
}
await bootstrap();
