import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entity/product.entity.js';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: 'seller' | 'buyer';

  @OneToMany(type => Product, Product => Product.publisher)
  products : Product[]
}