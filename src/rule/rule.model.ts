import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

export type RuleDocument = RuleModel & Document;

@Schema({ collection: collectionNames.RULE })
export class RuleModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  description: string;
}

export const RuleSchema = SchemaFactory.createForClass(RuleModel);
