import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { RuleModel } from '../rule/rule.model';

export type TypeDocument = TypeModel & Document;

@Schema({ _id: false })
class Way {
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT } })
  recyclePointID: mongoId | RecyclePointModel;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RULE }] })
  ruleIDs: mongoId[] | RuleModel[];
}

@Schema({ collection: collectionNames.TYPE })
export class TypeModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  ways: Way[];
}

export const TypeSchema = SchemaFactory.createForClass(TypeModel);
