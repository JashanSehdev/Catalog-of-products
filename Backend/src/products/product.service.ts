import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity.js';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product-dto.js';
import { UpdateProductDto } from './dto/update-product-dto.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto : CreateProductDto) : Promise <Product> {
    const product : Product = new Product();
     product.product_name = createProductDto.product_name
     product.price = createProductDto.price
     product.image = createProductDto.image
     product.publisher = createProductDto.publisher
     product.description = createProductDto.description
     product.hidden = createProductDto.hidden

     return this.productRepository.save(product)
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where : {hidden: false}
    });
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async update(id: number, updateProductDto : UpdateProductDto) : Promise <Product | null> {
     await this.productRepository.update(id, updateProductDto)

     return await this.productRepository.findOneBy({id})
  }
}
