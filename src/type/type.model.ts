import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { RuleSetModel } from '../rule-set/rule-set.model';

export type TypeDocument = TypeModel & Document;

// @Schema({ _id: false })
// class Way {
//   @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT } })
//   recyclePointID: mongoId | RecyclePointModel;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RULE }] })
//   ruleIDs: mongoId[] | RuleModel[];
// }

@Schema({ collection: collectionNames.TYPE })
export class TypeModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RULE_SET, unique: true }],
  })
  ruleSetIDs: mongoId[] | RuleSetModel[];
}

export const TypeSchema = SchemaFactory.createForClass(TypeModel);
