import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authentication')
export class Auth{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}