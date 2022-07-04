import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
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

  @Get(':id')
  async getById(@Param('id') id: string): Promise<MaterialModel> {
    const material = await this.materialService.findById(id);
    if (!material) throw new NotFoundException(MATERIAL_NOT_FOUND_ERROR);
    return material;
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {}

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: MaterialModel) {}
}
