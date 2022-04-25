import {Contains, IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, Max, Min} from "class-validator";
import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Position} from "../../positions/entities/position.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Column()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @Contains('+380')
    @Column()
    phone: string;

    @JoinTable()
    @ManyToOne(() => Position, position => position.users)
    position: Position;

    @Column({default: ''})
    @IsNotEmpty()
    photo: string;
}