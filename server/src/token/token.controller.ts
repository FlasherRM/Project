import {Controller, Get, Req} from '@nestjs/common';
import { TokenService } from './token.service';
import {Session} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService,
              private jwtService: JwtService,
  ) {}
  @Get()
  async getToken(@Session() session: Record<string, any>) {
    const jwt = await this.jwtService.signAsync({});
    session.jwt = jwt
    return {
      "success": true,
      "token": session.jwt
    }
  }
}
