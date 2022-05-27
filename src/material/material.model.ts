import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { collectionNames } from 'src/configs/mongo.config';
import { TypeModel } from 'src/type/type.model';

export type MaterialDocument = MaterialModel & Document;
@Schema({ collection: collectionNames.MATERIAL })
export class MaterialModel {
	_id: string;

	@Prop({ required: true, unique: true })
	title: string;

	// TODO Link to type
	// @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.TYPE }] })
	// similarMaterials: TypeModel[];

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.MATERIAL }] })
	similarMaterials: MaterialModel[];

	@Prop()
	description: string;

	@Prop([String])
	images: string[];

	@Prop([String])
	synonyms: string[];
}

export const MaterialSchema = SchemaFactory.createForClass(MaterialModel);
