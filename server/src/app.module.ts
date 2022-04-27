import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import {PositionsModule} from "./positions/positions.module";
import { TokenModule } from './token/token.module';
import {JwtModule} from "@nestjs/jwt";
import { MulterModule } from '@nestjs/platform-express';
import {memoryStorage} from "multer";

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'roman',
    password: 'roman',
    database: 'nest_project',
    autoLoadEntities: true,
    synchronize: true,
  }),
    MulterModule.register({
      dest: './uploads',
      storage: memoryStorage()
    }),
    UsersModule,PositionsModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
