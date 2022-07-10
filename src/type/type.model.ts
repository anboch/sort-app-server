import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';

export type TypeDocument = TypeModel & Document;

@Schema({ collection: collectionNames.TYPE })
export class TypeModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }],
  })
  recyclePointIDs: mongoId[] | RecyclePointModel[];
}

export const TypeSchema = SchemaFactory.createForClass(TypeModel);
