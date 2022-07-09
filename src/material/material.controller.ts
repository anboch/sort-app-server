import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Action } from 'src/casl/casl-ability.factory';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialModel } from './material.model';
import { MaterialService, SearchList } from './material.service';
import { CheckAbilities } from 'src/casl/casl-abilities.decorator';
import { AbilityGuard } from 'src/casl/casl-abilities.guard';
import { ParamId } from '../common/types';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: MaterialModel })
  async create(@Body() dto: CreateMaterialDto): Promise<MaterialModel> {
    return this.materialService.create(dto);
  }

  @Get('/by-id/:id')
  async getById(@Param() params: ParamId): Promise<MaterialModel> {
    return this.materialService.findById(params.id);
  }

  @Get('searchList')
  async searchList(): Promise<SearchList> {
    return this.materialService.getSearchList();
  }
}
