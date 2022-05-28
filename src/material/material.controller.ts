import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialModel } from './material.model';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateMaterialDto): Promise<MaterialModel> {
    return this.materialService.create(dto);
  }

  // @Get(':id')
  // async get(@Param('id') id: string) {}

  // @Delete(':id')
  // async delete(@Param('id') id: string) {}

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: MaterialModel) {}
}
