import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CategoryModel } from 'src/category/category.model';
import { collectionNames } from 'src/configs/mongo.config';

export type ClusterDocument = ClusterModel & Document;

@Schema({ collection: collectionNames.CLUSTER })
export class ClusterModel {
	_id: string;

	@Prop({ required: true, unique: true })
	title: string;

	@Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: collectionNames.CATEGORY })
	category: CategoryModel;
}

export const ClusterSchema = SchemaFactory.createForClass(ClusterModel);
