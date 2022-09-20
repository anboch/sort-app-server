import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { RuleSetModel } from '../rule-set/rule-set.model';
import { RuleModel } from '../rule/rule.model';
import { CreateTypeDto } from './dto/create-type.dto';
import { TYPE_NOT_FOUND_ERROR } from './type.constants';
import { TypeModel, TypeDocument } from './type.model';

@Injectable()
export class TypeService {
  constructor(@InjectModel(TypeModel.name) private typeModel: Model<TypeDocument>) {}

  async anonFindById(_id: string): Promise<TypeModel> {
    const foundType = await this.typeModel
      .findOne({ _id })
      .populate([
        {
          path: 'ruleSetIDs',
          model: RuleSetModel.name,
          populate: [
            {
              path: 'ruleIDs',
              model: RuleModel.name,
            },
            {
              path: 'recyclePointIDs',
              model: RecyclePointModel.name,
            },
          ],
        },
      ])
      .exec();
    if (!foundType) {
      throw new NotFoundException(TYPE_NOT_FOUND_ERROR);
    }
    return foundType;
  }

  async create(createTypeDto: CreateTypeDto): Promise<TypeModel> {
    // TODO check if recyclePointIDs is in collection
    const createdModel = new this.typeModel(createTypeDto);
    return createdModel.save();
  }
}
