import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
import { SearchMaterialDto } from './dto/search-material.dto';
import { MATERIAL_NOT_FOUND_ERROR } from './material.constants';
import { MaterialModel } from './material.model';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateMaterialDto): Promise<MaterialModel> {
    return this.materialService.create(dto);
  }

  @Get('/by-id/:id')
  async getById(@Param('id') id: string): Promise<MaterialModel> {
    const material = await this.materialService.findById(id);
    if (!material) throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    return material;
  }

  @Get('searchList')
  async searchList(): Promise<Pick<MaterialModel, 'titles' | 'categoryID' | 'clusterID'>[]> {
    const materialList = await this.materialService.getSearchList();
    if (!materialList) throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    return materialList;
  }
}
