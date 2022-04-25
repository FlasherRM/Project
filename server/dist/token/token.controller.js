"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let TokenController = class TokenController {
    constructor(tokenService, jwtService) {
        this.tokenService = tokenService;
        this.jwtService = jwtService;
    }
    async getToken(session) {
        const jwt = await this.jwtService.signAsync({});
        session.jwt = jwt;
        return {
            "success": true,
            "token": session.jwt
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "getToken", null);
TokenController = __decorate([
    (0, common_1.Controller)('token'),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        jwt_1.JwtService])
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map