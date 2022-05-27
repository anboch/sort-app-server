import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';
import { RecyclePointModel } from 'src/recycle-point/recycle-point.model';
import { TypeModel } from 'src/type/type.model';

export type BinDocument = BinModel & Document;

@Schema({ collection: collectionNames.BIN })
export class BinModel {
	_id: string;

	@Prop()
	title: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE })
	type: TypeModel;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.RECYCLE_POINT })
	recyclePoint: RecyclePointModel;
}

export const BinSchema = SchemaFactory.createForClass(BinModel);
