import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Action } from 'src/casl/casl-ability.factory';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CheckAbilities } from 'src/casl/casl-abilities.decorator';
import { AbilityGuard } from 'src/casl/casl-abilities.guard';
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
