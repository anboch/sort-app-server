import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BinModel } from 'src/bin/bin.model';
import { collectionNames } from 'src/configs/mongo.config';

export type UserDocument = UserModel & Document;

@Schema({ collection: collectionNames.USER })
export class UserModel {
	_id: string;

	@Prop({ required: true })
	isAdmin: boolean;

	@Prop({ required: true, unique: true })
	login: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.BIN }] })
	bins: BinModel[];

	@Prop()
	address: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
