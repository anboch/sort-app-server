import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecyclePointController } from './recycle-point.controller';
import { RecyclePointModel, RecyclePointSchema } from './recycle-point.model';
import { RecyclePointService } from './recycle-point.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: RecyclePointModel.name, schema: RecyclePointSchema }]),
	],
	controllers: [RecyclePointController],
	providers: [RecyclePointService],
})
export class RecyclePointModule {}
