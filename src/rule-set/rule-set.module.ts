import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleSetController } from './rule-set.controller';
import { RuleSetModel, RuleSetSchema } from './rule-set.model';
import { RuleSetService } from './rule-set.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RuleSetModel.name, schema: RuleSetSchema }])],
  controllers: [RuleSetController],
  providers: [RuleSetService],
})
export class RuleSetModule {}
