import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TagModel } from '../tag/tag.model';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { TypeModel } from '../type/type.model';

export type MaterialDocument = MaterialModel & Document;
@Schema({ collection: collectionNames.MATERIAL })
export class MaterialModel {
  _id: mongoId;

  @Prop({ required: true, type: [{ type: String, unique: true }] })
  titles: string[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE }],
  })
  typeIDs: mongoId[] | TypeModel[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.MATERIAL }],
  })
  similarMaterialIDs: mongoId[] | MaterialModel[];

  @Prop()
  description: string;

  @Prop()
  images: string[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TAG }],
  })
  tagIDs: mongoId[] | TagModel[];
}

export const MaterialSchema = SchemaFactory.createForClass(MaterialModel);
