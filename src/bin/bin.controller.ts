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
} from '@nestjs/common';
import { Action } from 'src/casl/casl-ability.factory';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BinModel } from './bin.model';
import { BinService } from './bin.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { NO_BIN_UPDATE_DATA } from './bin.constants';
import { Requestor } from 'src/decorators/user-id.decorator';
import { IRequestor } from 'src/auth/interfaces/requestor.interface';
import { CheckAbilities } from 'src/casl/casl-abilities.decorator';
import { AbilityGuard } from 'src/casl/casl-abilities.guard';
import { ParamId } from '../common/types';

@Controller('bin')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class BinController {
  constructor(private readonly binService: BinService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: BinModel })
  async create(@Requestor() requestor: IRequestor, @Body() dto: CreateBinDto): Promise<BinModel> {
    return this.binService.create(dto, requestor);
  }

  @Get('all')
  @CheckAbilities({ action: Action.Read, subject: BinModel })
  async getAll(@Requestor() requestor: IRequestor): Promise<BinModel[] | null> {
    return this.binService.getAllUserBins(requestor);
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: BinModel })
  async patch(
    @Requestor() requestor: IRequestor,
    @Body() dto: UpdateBinDto,
    @Param() params: ParamId
  ): Promise<BinModel> {
    // TODO check userId.binIds include binId
    if (Object.keys(dto).length === 0) throw new BadRequestException(NO_BIN_UPDATE_DATA);
    return this.binService.updateById(params.id, dto, requestor);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: BinModel })
  async delete(@Requestor() requestor: IRequestor, @Param() params: ParamId): Promise<void> {
    return this.binService.deleteById(params.id, requestor);
  }
}
