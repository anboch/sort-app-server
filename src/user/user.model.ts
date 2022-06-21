import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BinModel } from 'src/bin/bin.model';
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

@Schema({ collection: collectionNames.USER })
export class UserModel {
  _id: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.BIN }] })
  binIDs: BinModel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT }],
  })
  recyclePointIDs: RecyclePointModel[];

  @Prop()
  position: Position;

  @Prop()
  city: City;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
