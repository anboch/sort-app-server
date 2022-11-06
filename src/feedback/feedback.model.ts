import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
export type FeedbackDocument = FeedbackModel & Document;

export enum FeedbackType {
  MATERIAL_NOT_FOUND = 'material-not-found',
}

@Schema({ collection: collectionNames.FEEDBACK })
export class FeedbackModel {
  _id: mongoId;

  @Prop({ type: String, enum: FeedbackType })
  type: FeedbackType;

  @Prop()
  description: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(FeedbackModel);
