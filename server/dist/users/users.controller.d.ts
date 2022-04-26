import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from "@nestjs/jwt";
export declare class UsersController {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    create(createUserDto: CreateUserDto, file: any, headers: any): Promise<"The file size is too big" | {
        success: boolean;
        message: string;
        user_id?: undefined;
        file?: undefined;
    } | {
        success: boolean;
        user_id: number;
        message: string;
        file: any;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        fails: {
            page: string[];
        };
        page?: undefined;
        total_pages?: undefined;
        total_items?: undefined;
        count?: undefined;
        links?: undefined;
        users?: undefined;
    } | {
        success: boolean;
        message: string;
        fails?: undefined;
        page?: undefined;
        total_pages?: undefined;
        total_items?: undefined;
        count?: undefined;
        links?: undefined;
        users?: undefined;
    } | {
        success: boolean;
        page: number;
        total_pages: number;
        total_items: number;
        count: number;
        links: {
            next_url: string;
            prev_url: string;
        };
        users: {
            id: number;
            name: string;
            email: string;
            phone: string;
            position: string;
            position_id: number;
            photo: string;
        }[];
        message?: undefined;
        fails?: undefined;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        fails: {
            user_id: string[];
        };
        user?: undefined;
    } | {
        success: boolean;
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
            position: string;
            position_id: number;
            photo: string;
        };
        message?: undefined;
        fails?: undefined;
    }>;
}
