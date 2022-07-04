import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRecyclePointDto } from './dto/create-recycle-point.dto';
import { RecyclePointModel } from './recycle-point.model';
import { RecyclePointService } from './recycle-point.service';

@Controller('recycle-point')
export class RecyclePointController {
  constructor(private readonly recyclePointService: RecyclePointService) {}

  @Post('create')
  async create(@Body() dto: CreateRecyclePointDto): Promise<RecyclePointModel> {
    return this.recyclePointService.create(dto);
  }
}
