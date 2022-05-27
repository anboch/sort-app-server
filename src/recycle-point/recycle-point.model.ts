import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';
import { TypeModel } from 'src/type/type.model';

export type RecyclePointDocument = RecyclePointModel & Document;

@Schema({ collection: collectionNames.RECYCLE_POINT })
export class RecyclePointModel {
	_id: string;

	@Prop({ required: true })
	title: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE }] })
	types: TypeModel[];

	@Prop()
	description: string;

	@Prop({ unique: true })
	address: string;
}

export const RecyclePointSchema = SchemaFactory.createForClass(RecyclePointModel);
