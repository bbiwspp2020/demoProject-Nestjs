import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CreateProductDto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productName: string;

  @Column()
  category: string;

  @Column()
  quantity: string;

  @Column()
  price: string;

  @Column()
  details: string;

  @Column()
  image: string;
  
  @Column({ default: 1 })
  status: string;

  @CreateDateColumn()
  created:Date;

  @UpdateDateColumn()
  updated:Date
}
