import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CategoryModel } from '../category/category.model';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

export type TagDocument = TagModel & Document;

@Schema({ collection: collectionNames.TAG })
export class TagModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  titles: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.CATEGORY }] })
  categoryIDs: mongoId[] | CategoryModel[];
}

export const TagSchema = SchemaFactory.createForClass(TagModel);
