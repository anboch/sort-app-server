import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { RuleModel } from '../rule/rule.model';

export type RuleSetDocument = RuleSetModel & Document;

@Schema({ collection: collectionNames.RULE_SET })
export class RuleSetModel {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }] })
  recyclePointIDs: mongoId[] | RecyclePointModel[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RULE }] })
  ruleIDs: mongoId[] | RuleModel[];
}

export const RuleSetSchema = SchemaFactory.createForClass(RuleSetModel);
