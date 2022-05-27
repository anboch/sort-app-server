import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';

export type ClusterDocument = ClusterModel & Document;

@Schema({ collection: collectionNames.CLUSTER })
export class ClusterModel {
	_id: string;

	@Prop({ required: true, unique: true })
	title: string;

	// TODO Link to cluster
	// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.CATEGORY })
	// category: CategoryModel;
}

export const ClusterSchema = SchemaFactory.createForClass(ClusterModel);
