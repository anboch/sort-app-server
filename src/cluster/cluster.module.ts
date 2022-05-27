import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClusterController } from './cluster.controller';
import { ClusterModel, ClusterSchema } from './cluster.model';
import { ClusterService } from './cluster.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ClusterModel.name, schema: ClusterSchema }])],
  controllers: [ClusterController],
  providers: [ClusterService],
})
export class ClusterModule {}
