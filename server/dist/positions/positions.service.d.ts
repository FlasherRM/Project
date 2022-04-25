import { Repository } from "typeorm";
import { Position } from "./entities/position.entity";
export declare class PositionsService {
    private positionRepository;
    constructor(positionRepository: Repository<Position>);
    getPosition(): Promise<Position[]>;
}
