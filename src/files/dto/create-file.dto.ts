import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CreateFileDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    idUser: Number;

    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    created:Date;
  
    @UpdateDateColumn()
    updated:Date
}
