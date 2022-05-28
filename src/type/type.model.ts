import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';
import { RecyclePointModel } from 'src/recycle-point/recycle-point.model';

export type TypeDocument = TypeModel & Document;

@Schema({ collection: collectionNames.TYPE })
export class TypeModel {
  _id: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }],
  })
  recyclePointIDs: RecyclePointModel[];
}

export const TypeSchema = SchemaFactory.createForClass(TypeModel);
