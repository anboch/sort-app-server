import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleController } from './rule.controller';
import { RuleModel, RuleSchema } from './rule.model';
import { RuleService } from './rule.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RuleModel.name, schema: RuleSchema }])],
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule {}
