import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

export type TagDocument = TagModel & Document;

export enum TagGroup {
  CATEGORY = 'category',
  CODE = 'code',
  NO = '',
}

@Schema({ collection: collectionNames.TAG })
export class TagModel {
  _id: mongoId;

  @Prop({ required: true, type: [{ type: String, unique: true }] })
  titles: string[];

  @Prop({ type: String, enum: TagGroup, required: true, default: TagGroup.NO })
  group?: TagGroup;
}

export const TagSchema = SchemaFactory.createForClass(TagModel);
