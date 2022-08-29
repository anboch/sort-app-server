import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { CheckAbilities } from '../casl/casl-abilities.decorator';
import { AbilityGuard } from '../casl/casl-abilities.guard';
import { Action } from '../casl/casl-ability.factory';
import { RuleModel } from './rule.model';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';

@Controller('rule')
@UseGuards(AccessTokenGuard, AbilityGuard)
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: RuleModel })
  async create(@Body() dto: CreateRuleDto): Promise<RuleModel> {
    return this.ruleService.create(dto);
  }
}
