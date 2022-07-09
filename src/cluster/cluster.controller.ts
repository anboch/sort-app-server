import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CheckAbilities } from 'src/casl/casl-abilities.decorator';
import { AbilityGuard } from 'src/casl/casl-abilities.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { ClusterModel } from './cluster.model';
import { ClusterService } from './cluster.service';
import { CreateClusterDto } from './dto/create-cluster.dto';

@Controller('cluster')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: ClusterModel })
  async create(@Body() dto: CreateClusterDto): Promise<ClusterModel> {
    return this.clusterService.create(dto);
  }
}
