import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';

export type RecyclePointDocument = RecyclePointModel & Document;

export class Position {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

class DailySchedule {
  @Prop({ enum: Weekdays })
  day: Weekdays;

  @Prop()
  periods: [{ start: string; end: string }];
}

class OpeningHours {
  @Prop({ required: true })
  dayAndNight: boolean;

  @Prop()
  weekSchedule: DailySchedule[];
}

class Contacts {
  @Prop()
  site: string;
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
  openingHours: OpeningHours;

  @Prop()
  contacts: Contacts;

  @Prop()
  position: Position;
}

export const RecyclePointSchema = SchemaFactory.createForClass(RecyclePointModel);
