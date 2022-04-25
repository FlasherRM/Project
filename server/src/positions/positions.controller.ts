import {Controller, Get} from "@nestjs/common";
import {PositionsService} from "./positions.service";

@Controller('positions')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {
    }
    @Get()
    async getPositions() {
        const pos = await this.positionsService.getPosition();

        return {
            "success": true,
            "positions": pos
        }
    }
}