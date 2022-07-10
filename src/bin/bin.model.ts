import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { TypeModel } from '../type/type.model';

export type BinDocument = BinModel & Document;

@Schema({ collection: collectionNames.BIN })
export class BinModel {
  _id: mongoId;

  @Prop()
  title: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE })
  typeID: mongoId | TypeModel;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }] })
  preferRPIDs: mongoId[] | RecyclePointModel[];
}

export const BinSchema = SchemaFactory.createForClass(BinModel);
