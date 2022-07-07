import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from 'src/common/types';
import { collectionNames } from 'src/configs/mongo.config';

export type AuthDocument = AuthModel & Document;

// TODO to env
const NEXT_CONFIRM_LINK_DELAY_SEC = 60 * 5;

@Schema({ collection: collectionNames.AUTH })
export class AuthModel {
  _id: mongoId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  confirmCode: string;

  @Prop({ type: Date, expires: NEXT_CONFIRM_LINK_DELAY_SEC, default: Date.now })
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
