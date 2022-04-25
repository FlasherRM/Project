import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '40m' },
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {}
