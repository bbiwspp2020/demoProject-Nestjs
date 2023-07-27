import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CreateUserDto {
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
  
    @Column({ default: 1 })
    role: string;
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    created:Date;
  
    @UpdateDateColumn()
    updated:Date
}
