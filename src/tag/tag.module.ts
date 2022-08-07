import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './tag.controller';
import { TagModel, TagSchema } from './tag.model';
import { TagService } from './tag.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TagModel.name, schema: TagSchema }])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
