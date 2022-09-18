import { Controller, Get, Param } from '@nestjs/common';
import { ParamId } from '../common/types';
import { RuleSetModel } from './rule-set.model';
import { RuleSetService } from './rule-set.service';

@Controller('rule-set')
export class RuleSetController {
  constructor(private readonly ruleSetService: RuleSetService) {}

  @Get('/by-id/:id')
  async getRuleSetById(@Param() params: ParamId): Promise<RuleSetModel> {
    return this.ruleSetService.anonFindById(params.id);
  }
}
