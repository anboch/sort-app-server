import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClusterModel, ClusterDocument } from './cluster.model';
import { CreateClusterDto } from './dto/create-cluster.dto';

@Injectable()
export class ClusterService {
	constructor(@InjectModel(ClusterModel.name) private clusterModel: Model<ClusterDocument>) {}

	async create(createClusterDto: CreateClusterDto): Promise<ClusterModel> {
		const createdModel = new this.clusterModel(createClusterDto);
		return createdModel.save();
	}
}
