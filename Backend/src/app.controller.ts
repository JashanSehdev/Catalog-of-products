import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService, ProductService } from './app.service.js';
import type { Product, InputProduct as SetProduct } from './assets/product.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  @Post()
  postProduct(@Body() product: SetProduct): string {
    const success = this.productService.addProduct(product);

    return success ? 'kaam ho gya' : 'kaam nahi hua';
  }

  @Put()
  updateProduct(@Body() product: Product): string {

    const success = this.productService.editProduct(product);

    return success ? 'Kaam ho gya' : 'kaam nahi hua';
  }
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const success = this.productService.deleteProduct(id);
    return success ? 'Kaam ho gya' : 'kaam nahi hua';
  }
}
