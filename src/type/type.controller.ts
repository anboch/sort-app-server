import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CheckAbilities } from '../casl/casl-abilities.decorator';
import { AbilityGuard } from '../casl/casl-abilities.guard';
import { Action } from '../casl/casl-ability.factory';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeModel } from './type.model';
import { TypeService } from './type.service';

@Controller('type')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: TypeModel })
  async create(@Body() dto: CreateTypeDto): Promise<TypeModel> {
    return this.typeService.create(dto);
  }
}
