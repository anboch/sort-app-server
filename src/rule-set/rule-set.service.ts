import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { RuleModel } from '../rule/rule.model';
import { RULE_SET_NOT_FOUND_ERROR } from './rule-set.constants';
import { RuleSetModel, RuleSetDocument } from './rule-set.model';

@Injectable()
export class RuleSetService {
  constructor(@InjectModel(RuleSetModel.name) private ruleSetModel: Model<RuleSetDocument>) {}

  async anonFindById(_id: string): Promise<RuleSetModel> {
    const foundRuleSet = await this.ruleSetModel
      .findOne({ _id })
      .populate([
        {
          path: 'ruleIDs',
          model: RuleModel.name,
        },
        {
          path: 'recyclePointIDs',
          model: RecyclePointModel.name,
        },
      ])
      .exec();
    if (!foundRuleSet) {
      throw new NotFoundException(RULE_SET_NOT_FOUND_ERROR);
    }
    return foundRuleSet;
  }
}
