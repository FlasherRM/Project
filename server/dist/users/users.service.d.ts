import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Position } from "../positions/entities/position.entity";
export declare class UsersService {
    private usersRepository;
    private positionRepository;
    constructor(usersRepository: Repository<User>, positionRepository: Repository<Position>);
    create(createUserDto: CreateUserDto, file: any): Promise<{
        id: number;
    }>;
    findAll(): string;
    findOne(id: number): Promise<User>;
    getUserByEmail(email: string, phone: string): Promise<User>;
    paginate(options: IPaginationOptions): Promise<Pagination<User>>;
}
