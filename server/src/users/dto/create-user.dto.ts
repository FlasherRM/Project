import {Contains, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Max, MaxLength, Min, MinLength} from "class-validator";
import {Column, JoinTable, ManyToOne} from "typeorm";
import {Position} from "../../positions/entities/position.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(60)
    @Column()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @MinLength(2)
    @MaxLength(100)
    @Column()
    readonly email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @Contains('+380')
    readonly phone: string;

    @JoinTable()
    @IsNotEmpty()
    @ManyToOne(() => Position, position => position.users)
    readonly position: Position;


    photo: string;
}