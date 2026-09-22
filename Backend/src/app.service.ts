import { Injectable } from '@nestjs/common';
import { Product, productData as productsData, InputProduct as SetProduct } from './assets/product.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


@Injectable() 
export class ProductService {
  private products : Product[] = productsData;
  private nextId = 4 ;
  getAllProducts() : Product[] {
    return this.products;
  }

  addProduct (product : SetProduct) : boolean {
    if (!product) return false;

    const newProduct = {
      id: this.nextId,
      ...product
      
    }
    this.nextId += 1;
    this.products.push(newProduct);
    return true;
  }
  
  editProduct(product : Product) {

    if (!product) return false;
    const id =  product.id
    console.log("product-id: ", id)
    this.products = this.products.map((item) => {
      if (item.id === id) return product
      else return item;
    })

    console.log(this.products)
    return true
  }

  deleteProduct(id : number) {
    if (!id) return false
    this.products = this.products.filter((item) => item.id !== id)
    return true
  }
}