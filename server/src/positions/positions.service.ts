import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Position} from "./entities/position.entity";

@Injectable()
export class PositionsService {
    constructor(@InjectRepository(Position) private positionRepository: Repository<Position>) {
    }
    async getPosition() {
        return this.positionRepository.find();
    }
}