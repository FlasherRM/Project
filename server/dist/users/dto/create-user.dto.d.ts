import { Position } from "../../positions/entities/position.entity";
export declare class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly position: Position;
    photo: string;
}
