import { PositionsService } from "./positions.service";
export declare class PositionsController {
    private readonly positionsService;
    constructor(positionsService: PositionsService);
    getPositions(): Promise<{
        success: boolean;
        positions: import("./entities/position.entity").Position[];
    }>;
}
