import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  imgProfile: string;

  @Column({ default: 1 })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created:Date;

  @UpdateDateColumn()
  updated:Date
}