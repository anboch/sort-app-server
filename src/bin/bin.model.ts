import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';
import { RecyclePointModel } from 'src/recycle-point/recycle-point.model';
import { TypeModel } from 'src/type/type.model';

export type BinDocument = BinModel & Document;

@Schema({ collection: collectionNames.BIN })
export class BinModel {
  _id: string;

  @Prop()
  title: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE })
  typeID: TypeModel;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }] })
  preferRPIDs: RecyclePointModel[];
}

export const BinSchema = SchemaFactory.createForClass(BinModel);
