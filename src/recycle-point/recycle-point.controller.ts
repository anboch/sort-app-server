import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { IRequestor } from '../auth/interfaces/requestor.interface';
import { CheckAbilities } from '../casl/casl-abilities.decorator';
import { AbilityGuard } from '../casl/casl-abilities.guard';
import { Action } from '../casl/casl-ability.factory';
import { Requestor } from '../decorators/user-id.decorator';
import { CreateRecyclePointDto } from './dto/create-recycle-point.dto';
import { GetRecyclePointByIdsDto } from './dto/get-by-ids-recycle-point.dto';
import { RecyclePointModel } from './recycle-point.model';
import { RecyclePointService } from './recycle-point.service';

@Controller('recycle-point')
@UseGuards(AccessTokenGuard, AbilityGuard)
export class RecyclePointController {
  constructor(private readonly recyclePointService: RecyclePointService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: RecyclePointModel })
  async create(@Body() dto: CreateRecyclePointDto): Promise<RecyclePointModel> {
    return this.recyclePointService.create(dto);
  }

  @Put('by-ids')
  async getByIds(
    @Body() { recyclePointIds }: GetRecyclePointByIdsDto
  ): Promise<RecyclePointModel[]> {
    return this.recyclePointService.getByIds(recyclePointIds);
  }
}
