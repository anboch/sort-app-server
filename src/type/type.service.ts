import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeModel, TypeDocument } from './type.model';

@Injectable()
export class TypeService {
	constructor(@InjectModel(TypeModel.name) private typeModel: Model<TypeDocument>) {}

	async create(createTypeDto: CreateTypeDto): Promise<TypeModel> {
		const createdModel = new this.typeModel(createTypeDto);
		return createdModel.save();
	}
}
