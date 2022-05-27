import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';

export type CategoryDocument = CategoryModel & Document;

@Schema({ collection: collectionNames.CATEGORY })
export class CategoryModel {
  _id: string;

  @Prop({ required: true, unique: true })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
