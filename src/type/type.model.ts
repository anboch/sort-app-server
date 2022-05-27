import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ClusterModel } from 'src/cluster/cluster.model';
import { collectionNames } from 'src/configs/mongo.config';

export type TypeDocument = TypeModel & Document;

@Schema({ collection: collectionNames.TYPE })
export class TypeModel {
	_id: string;

	@Prop({ required: true, unique: true })
	title: string;

	@Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: collectionNames.CLUSTER })
	cluster: ClusterModel;
}

export const TypeSchema = SchemaFactory.createForClass(TypeModel);
