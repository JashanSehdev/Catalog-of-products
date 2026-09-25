import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity.js";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.service.js";


@Module ({
    imports : [TypeOrmModule.forFeature([Product])],
    exports : [TypeOrmModule],
    providers: [ProductService],
    controllers : [ProductController]
})

export class ProductModule {} 