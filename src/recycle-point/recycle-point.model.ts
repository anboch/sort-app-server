import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { Position } from '../maps/data.structure';

export type RecyclePointDocument = RecyclePointModel & Document;

export enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

@Schema({ _id: false })
class DailySchedule {
  @Prop({ enum: Weekdays })
  day: Weekdays;

  @Prop()
  periods: [{ start: string; end: string }];
}

@Schema({ _id: false })
class OpeningHours {
  @Prop({ required: true })
  dayAndNight: boolean;

  @Prop()
  weekSchedule?: DailySchedule[];
}

@Schema({ _id: false })
class Contacts {
  @Prop()
  site: string;
}

@Schema({ collection: collectionNames.RECYCLE_POINT })
export class RecyclePointModel {
  _id: mongoId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  openingHours?: OpeningHours;

  @Prop()
  contacts?: Contacts;

  @Prop()
  position: Position;
}

export const RecyclePointSchema = SchemaFactory.createForClass(RecyclePointModel);
