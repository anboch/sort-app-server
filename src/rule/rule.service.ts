import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RuleDocument, RuleModel } from './rule.model';
import { CreateRuleDto } from './dto/create-rule.dto';

@Injectable()
export class RuleService {
  constructor(@InjectModel(RuleModel.name) private ruleModel: Model<RuleDocument>) {}

  async create(createRuleDto: CreateRuleDto): Promise<RuleModel> {
    const createdModel = new this.ruleModel(createRuleDto);
    return createdModel.save();
  }

  async findAll(): Promise<RuleModel[]> {
    return this.ruleModel.find().exec();
  }
}
