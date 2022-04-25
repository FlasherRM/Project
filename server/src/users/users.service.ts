import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import {Position} from "../positions/entities/position.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
              @InjectRepository(User) private positionRepository: Repository<Position>) {
  }
  async create(createUserDto: CreateUserDto, file) {
      createUserDto.photo = file;
      const new_user = await this.usersRepository.create(createUserDto);

      const user = await this.usersRepository.save(new_user);
      return {
        id: user.id
      }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id, {
        relations: ['position']
    })
  }

  async getUserByEmail(email: string, phone: string): Promise<User> {
    return await this.usersRepository.findOne({
        where: [
            {
                email
            },
            {
                phone
            }
        ],
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
      return paginate<User>(this.usersRepository, options, {
          relations: ['position']
      });
  }
}
