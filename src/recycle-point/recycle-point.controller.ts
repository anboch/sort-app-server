import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CheckAbilities } from '../casl/casl-abilities.decorator';
import { AbilityGuard } from '../casl/casl-abilities.guard';
import { Action } from '../casl/casl-ability.factory';
import { CreateRecyclePointDto } from './dto/create-recycle-point.dto';
import { RecyclePointModel } from './recycle-point.model';
import { RecyclePointService } from './recycle-point.service';

@Controller('recycle-point')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class RecyclePointController {
  constructor(private readonly recyclePointService: RecyclePointService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: RecyclePointModel })
  async create(@Body() dto: CreateRecyclePointDto): Promise<RecyclePointModel> {
    return this.recyclePointService.create(dto);
  }
}
