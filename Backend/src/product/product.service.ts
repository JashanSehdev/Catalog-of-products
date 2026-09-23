import { Injectable } from '@nestjs/common';
import { Product , InputProduct as SetProduct, productData as productsData } from '../assets/product.js';

@Injectable()
export class ProductService {
  private products: Product[] = productsData;
  private nextId = 4;
  getAllProducts(): Product[] {
    return this.products;
  }

  addProduct(product: SetProduct): Product {
    try {
      if (!product) throw new Error('Product not found');
      const newProduct = {
        id: this.nextId,
        ...product,
      };
      this.nextId += 1;
      this.products.push(newProduct);
      return newProduct;
    } catch (error) {
      console.error('error while adding data', error);
      throw error;
    }
  }

  editProduct(product: Product) {
    try {
      if (!product) throw new Error('Request is not valid');
      const id = product.id;
      console.log('product-id: ', id);
      this.products = this.products.map((item) => {
        if (item.id === id) return product;
        else return item;
      });

      return product;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  deleteProduct(id: number) {
    if (!id) return false;
    this.products = this.products.filter((item) => item.id !== id);
    return id;
  }
}
