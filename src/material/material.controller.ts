import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialModel } from './material.model';
import { MaterialService } from './material.service';
import { ParamId } from '../common/types';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { CheckAbilities } from '../casl/casl-abilities.decorator';
import { AbilityGuard } from '../casl/casl-abilities.guard';
import { Action } from '../casl/casl-ability.factory';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post('create')
  @UseGuards(AccessTokenGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: MaterialModel })
  async create(@Body() dto: CreateMaterialDto): Promise<MaterialModel> {
    return this.materialService.create(dto);
  }

  @Get('/by-id/:id')
  async getById(@Param() params: ParamId): Promise<MaterialModel> {
    return this.materialService.findById(params.id);
  }

  @Get('/by-type-id/:id')
  async getByTypeId(@Param() params: ParamId): Promise<MaterialModel[]> {
    return this.materialService.findByTypeId(params.id);
  }
}
