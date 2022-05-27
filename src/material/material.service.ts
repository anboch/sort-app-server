import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialDocument, MaterialModel } from './material.model';

@Injectable()
export class MaterialService {
	constructor(@InjectModel(MaterialModel.name) private materialModel: Model<MaterialDocument>) {}

	async create(createMaterialDto: CreateMaterialDto): Promise<MaterialModel> {
		const createdModel = new this.materialModel(createMaterialDto);
		return createdModel.save();
	}

	async findAll(): Promise<MaterialModel[]> {
		return this.materialModel.find().exec();
	}
}
