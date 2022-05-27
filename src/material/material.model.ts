import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';
import { TypeModel } from 'src/type/type.model';

export type MaterialDocument = MaterialModel & Document;
@Schema({ collection: collectionNames.MATERIAL })
export class MaterialModel {
  _id: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE }],
  })
  types: TypeModel[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.MATERIAL }] })
  similarMaterials: MaterialModel[];

  @Prop()
  description: string;

  @Prop([String])
  images: string[];

  @Prop([String])
  synonyms: string[];
}

export const MaterialSchema = SchemaFactory.createForClass(MaterialModel);
