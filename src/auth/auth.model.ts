import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';

export type AuthDocument = AuthModel & Document;

const NEXT_CONFIRM_LINK_DELAY = 60 * 5;

@Schema({ collection: collectionNames.AUTH })
export class AuthModel {
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  confirmCode: string;

  @Prop({ type: Date, expires: NEXT_CONFIRM_LINK_DELAY, default: Date.now })
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
