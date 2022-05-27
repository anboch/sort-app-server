import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BinController } from './bin.controller';
import { BinModel, BinSchema } from './bin.model';
import { BinService } from './bin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: BinModel.name, schema: BinSchema }])],
  controllers: [BinController],
  providers: [BinService],
})
export class BinModule {}
