import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BinModel, BinDocument } from './bin.model';
import { CreateBinDto } from './dto/create-bin.dto';

@Injectable()
export class BinService {
	constructor(@InjectModel(BinModel.name) private binModel: Model<BinDocument>) {}

	async create(createBinDto: CreateBinDto): Promise<BinModel> {
		const createdModel = new this.binModel(createBinDto);
		return createdModel.save();
	}
}
