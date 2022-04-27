import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Position} from "../positions/entities/position.entity";
import {JwtModule} from "@nestjs/jwt";
import {MulterModule} from "@nestjs/platform-express";
import {memoryStorage} from "multer";

@Module({
  imports: [
      MulterModule.register({
          dest: './uploads',
          storage: memoryStorage()
      }),
      TypeOrmModule.forFeature([User, Position],
      ),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '30s' },
  })],

  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
