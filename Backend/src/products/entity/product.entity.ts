import { IsBoolean } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  publisher: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @IsBoolean()
  @Column()
  hidden: boolean;
}
