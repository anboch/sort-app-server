import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongoId } from '../common/types';
import { collectionNames } from '../configs/mongo.config';

export type ClusterDocument = ClusterModel & Document;

@Schema({ collection: collectionNames.CLUSTER })
export class ClusterModel {
  _id: mongoId;

  @Prop({ required: true, unique: true })
  title: string;
}

export const ClusterSchema = SchemaFactory.createForClass(ClusterModel);
