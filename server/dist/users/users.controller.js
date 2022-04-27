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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_1 = require("@nestjs/jwt");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let UsersController = class UsersController {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async create(createUserDto, file, headers) {
        try {
            const candidate = await this.usersService.getUserByEmail(createUserDto.email, createUserDto.phone);
            if (candidate) {
                return {
                    "success": false,
                    "message": "User with this phone or email already exist"
                };
            }
            if (file.size > 5000000) {
                return "The file size is too big";
            }
            const user = await this.usersService.create(createUserDto, file.filename);
            return {
                "success": true,
                "user_id": user.id,
                "message": "New user successfully registered",
            };
        }
        catch (e) {
            return {
                error: e
            };
        }
    }
    async findAll(page = 1, limit = 6) {
        if (page == 0) {
            return {
                "success": false,
                "message": "Validation failed",
                "fails": {
                    "page": [
                        "The page must be at least 1."
                    ]
                }
            };
        }
        limit = limit > 100 ? 100 : limit;
        const data = await this.usersService.paginate({
            page,
            limit,
            route: 'http://localhost:3000/users/',
        });
        if (data.meta.itemCount == 0) {
            return {
                "success": false,
                "message": "Page not found"
            };
        }
        return {
            "success": true,
            "page": data.meta.currentPage,
            "total_pages": data.meta.totalPages,
            "total_items": data.meta.totalItems,
            "count": data.meta.itemCount,
            "links": {
                "next_url": "test",
                "prev_url": "test",
            },
            "users": data.items.map(item => {
                return {
                    "id": item.id,
                    "name": item.name,
                    "email": item.email,
                    "phone": item.phone,
                    "position": item.position.name,
                    "position_id": item.position.id,
                    "photo": "http://localhost:5000/api/v1/uploads/" + item.photo
                };
            })
        };
    }
    async findOne(id) {
        if (typeof (id) == 'string') {
            return {
                "success": false,
                "message": "Validation failed",
                "fails": {
                    "user_id": [
                        "The user_id must be an integer."
                    ]
                }
            };
        }
        const user = await this.usersService.findOne(+id);
        if (user) {
            return {
                "success": true,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "position": user.position.name,
                    "position_id": user.position.id,
                    "photo": 'http://localhost:5000/api/v1/uploads/' + user.photo
                }
            };
        }
        else {
            return {
                "success": false,
                "message": "The user with the requested identifier does not exist",
                "fails": {
                    "user_id": [
                        "User not found"
                    ]
                }
            };
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtenstion = file.originalname.split('.')[1];
                const newFileName = name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtenstion;
                cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            let ext = (0, path_1.extname)(file.originalname);
            if (ext !== '.jpg' && ext !== '.jpeg') {
                return cb(new common_1.HttpException('Only .jpg/.jpeg images are allowed!', common_1.HttpStatus.BAD_REQUEST), null);
            }
            cb(null, true);
        },
        limits: { fileSize: 1024 * 1024 }
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(6), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map