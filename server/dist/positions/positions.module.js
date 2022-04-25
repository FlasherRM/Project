"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const position_entity_1 = require("./entities/position.entity");
const positions_controller_1 = require("./positions.controller");
const positions_service_1 = require("./positions.service");
let PositionsModule = class PositionsModule {
};
PositionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([position_entity_1.Position])],
        controllers: [positions_controller_1.PositionsController],
        providers: [positions_service_1.PositionsService]
    })
], PositionsModule);
exports.PositionsModule = PositionsModule;
//# sourceMappingURL=positions.module.js.map