import { TokenService } from './token.service';
import { JwtService } from "@nestjs/jwt";
export declare class TokenController {
    private readonly tokenService;
    private jwtService;
    constructor(tokenService: TokenService, jwtService: JwtService);
    getToken(session: Record<string, any>): Promise<{
        success: boolean;
        token: any;
    }>;
}
