import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClusterModel } from './cluster.model';
import { ClusterService } from './cluster.service';
import { CreateClusterDto } from './dto/create-cluster.dto';

@Controller('cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateClusterDto): Promise<ClusterModel> {
    return this.clusterService.create(dto);
  }
}
