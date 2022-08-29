import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialController } from './material.controller';
import { MaterialModel, MaterialSchema } from './material.model';
import { MaterialService } from './material.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MaterialModel.name, schema: MaterialSchema }])],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
