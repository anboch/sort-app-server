import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

export type CategoryDocument = CategoryModel & Document;

@Schema({ collection: collectionNames.CATEGORY })
export class CategoryModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
