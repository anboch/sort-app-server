import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';

export type RecyclePointDocument = RecyclePointModel & Document;

export class Position {
  @Prop()
  latitude: number
  
  @Prop()
  longitude: number
}

@Schema({ collection: collectionNames.RECYCLE_POINT })
export class RecyclePointModel {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ unique: true })
  address: string;

  @Prop()
  description: string;

  @Prop()
  openingHours: string;

  @Prop()
  site: string;

  @Prop()
  position: Position;
}

export const RecyclePointSchema = SchemaFactory.createForClass(RecyclePointModel);
