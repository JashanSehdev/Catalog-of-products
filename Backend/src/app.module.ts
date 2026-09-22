import { Module } from '@nestjs/common';
import { AppController, ProductController } from './app.controller.js';
import { AppService, ProductService } from './app.service.js';

@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
