import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BinModel } from 'src/bin/bin.model';
import { collectionNames } from 'src/configs/mongo.config';
import { RecyclePointModel } from 'src/recycle-point/recycle-point.model';

export type UserDocument = UserModel & Document;

@Schema({ collection: collectionNames.USER })
export class UserModel {
  _id: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.BIN }] })
  binIDs: BinModel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }],
  })
  recyclePointIDs: RecyclePointModel[];

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
