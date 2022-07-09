import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { BinModel } from 'src/bin/bin.model';
import { mongoId } from 'src/common/types';
import { collectionNames } from 'src/configs/mongo.config';
import { Coordinates, Position } from 'src/maps/data.structure';
import { RecyclePointModel } from 'src/recycle-point/recycle-point.model';

export type UserDocument = UserModel & Document;

class City {
  @Prop()
  coordinates: Coordinates;

  @Prop()
  name: string;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
@Schema({ collection: collectionNames.USER })
export class UserModel {
  _id: mongoId;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.BIN }] })
  binIDs: mongoId[] | BinModel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }],
  })
  recyclePointIDs: mongoId[] | RecyclePointModel[];

  @Prop()
  position: Position;

  @Prop()
  city: City;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
