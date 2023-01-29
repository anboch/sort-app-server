import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
export type FeedbackDocument = FeedbackModel & Document;

export enum FeedbackType {
  MATERIAL_NOT_FOUND = 'material-not-found',
  SEARCH_LIST_REQUEST = 'search-list-request',
}

@Schema({ collection: collectionNames.FEEDBACK, timestamps: true })
export class FeedbackModel {
  _id: mongoId;

  @Prop({ type: String, enum: FeedbackType, required: true })
  type: FeedbackType;

  @Prop()
  description?: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(FeedbackModel);
