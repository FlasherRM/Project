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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UsersService = class UsersService {
    constructor(usersRepository, positionRepository) {
        this.usersRepository = usersRepository;
        this.positionRepository = positionRepository;
    }
    async create(createUserDto, file) {
        createUserDto.photo = file;
        const new_user = await this.usersRepository.create(createUserDto);
        const user = await this.usersRepository.save(new_user);
        return {
            id: user.id
        };
    }
    findAll() {
        return `This action returns all users`;
    }
    async findOne(id) {
        return await this.usersRepository.findOne(id, {
            relations: ['position']
        });
    }
    async getUserByEmail(email, phone) {
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
    async paginate(options) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.usersRepository, options, {
            relations: ['position']
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map