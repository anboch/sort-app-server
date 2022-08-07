import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CheckAbilities } from '../casl/casl-abilities.decorator';
import { AbilityGuard } from '../casl/casl-abilities.guard';
import { Action } from '../casl/casl-ability.factory';
import { TagModel } from './tag.model';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: TagModel })
  async create(@Body() dto: CreateTagDto): Promise<TagModel> {
    return this.tagService.create(dto);
  }
}
