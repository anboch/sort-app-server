import {
  BadRequestException,
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
import { UserId } from 'src/decorators/user-id.decorator';
import { BinModel } from './bin.model';
import { BinService } from './bin.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { BIN_NOT_FOUND_ERROR, NO_BIN_UPDATE_DATA } from './bin.constants';
import { UserIdDto } from 'src/common/dto/user-id.dto';

@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) {}

  // @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateBinDto): Promise<BinModel> {
    return this.binService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  @Get('all')
  async getAll(@UserId() { id }: UserIdDto): Promise<BinModel[] | null> {
    return this.binService.findByUserID(id);
  }

  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  @Patch(':binId')
  async patch(
    @UserId() { id }: UserIdDto,
    @Body() dto: UpdateBinDto,
    @Param('binId') binId: string
  ): Promise<BinModel> {
    // TODO check userId.binIds include binId
    if (Object.keys(dto).length === 0) throw new BadRequestException(NO_BIN_UPDATE_DATA);
    const updatedBin = await this.binService.updateById(binId, dto);
    if (!updatedBin) throw new NotFoundException(BIN_NOT_FOUND_ERROR);
    return updatedBin;
  }

  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  @Delete(':binId')
  async delete(@UserId() { id }: UserIdDto, @Param('binId') binId: string): Promise<void> {
    // TODO check userId.binIds include binId
    const { deletedCount } = await this.binService.deleteById(binId);
    if (deletedCount === 0) throw new NotFoundException(BIN_NOT_FOUND_ERROR);
  }
}
