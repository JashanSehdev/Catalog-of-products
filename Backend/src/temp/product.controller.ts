import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import type { Product, InputProduct as SetProduct } from '../assets/product.js';
import { ProductService } from './product.service.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  @Post()
  postProduct(@Body() product: SetProduct): Product {
    return this.productService.addProduct(product);
  }

  @Put()
  updateProduct(@Body() product: Product): Product {
    return this.productService.editProduct(product);
  }
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
