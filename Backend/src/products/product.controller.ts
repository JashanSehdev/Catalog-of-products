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
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product-dto.js';
import { UpdateProductDto } from './dto/update-product-dto.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Get(':id')
  getProductbyId(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Get()
  getAllNonHiddenProduct() {
    return this.productService.findAll();
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log(updateProductDto)
    return this.productService.update(id, updateProductDto);
  }
}
