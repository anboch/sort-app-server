import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BinModel } from './bin.model';
import { BinService } from './bin.service';
import { CreateBinDto } from './dto/create-bin.dto';

@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateBinDto): Promise<BinModel> {
    return this.binService.create(dto);
  }
}
