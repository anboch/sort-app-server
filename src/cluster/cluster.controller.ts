import { Body, Controller, Post } from '@nestjs/common';
import { ClusterModel } from './cluster.model';
import { ClusterService } from './cluster.service';
import { CreateClusterDto } from './dto/create-cluster.dto';

@Controller('cluster')
export class ClusterController {
	constructor(private readonly clusterService: ClusterService) {}

	@Post('create')
	async create(@Body() dto: CreateClusterDto): Promise<ClusterModel> {
		return this.clusterService.create(dto);
	}
}