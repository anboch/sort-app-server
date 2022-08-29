import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';
import { UserModel } from '../user/user.model';

// todo from config
const JWT_REFRESH_EXPIRES_IN_sec = 60 * 60 * 24 * 180;

// Confirm
export type AuthConfirmDocument = AuthConfirmModel & Document;
@Schema({ collection: collectionNames.AUTH_CONFIRM })
export class AuthConfirmModel {
  _id: mongoId;

  @Prop()
  codeHash: string;

  @Prop({ min: Date.now })
  createdAt: number;

  @Prop({ unique: true })
  email: string;
}

export const AuthConfirmSchema = SchemaFactory.createForClass(AuthConfirmModel);

// Session
export type AuthSessionDocument = AuthSessionModel & Document;
@Schema({ collection: collectionNames.AUTH_SESSION })
export class AuthSessionModel {
  _id: mongoId;

  // todo add index
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: collectionNames.USER })
  userID: mongoId | UserModel;

  @Prop({ required: true })
  refreshTokenHash: string;

  @Prop({ type: Date, expires: JWT_REFRESH_EXPIRES_IN_sec, default: Date.now })
  createdAt: Date;
}

export const AuthSessionSchema = SchemaFactory.createForClass(AuthSessionModel);
