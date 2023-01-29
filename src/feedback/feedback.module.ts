import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModel, FeedbackSchema } from './feedback.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: FeedbackModel.name, schema: FeedbackSchema }])],
  providers: [FeedbackService],
  controllers: [FeedbackController],
  exports: [FeedbackService],
})
export class FeedbackModule {}
