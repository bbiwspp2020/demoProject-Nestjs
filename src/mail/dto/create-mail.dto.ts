import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CreateMailDto {
    to: string;
    from:string;
    subject:string;
    text:string;
}
