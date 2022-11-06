import { Body, Controller, Post } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackModel } from './feedback.model';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('create')
  async create(@Body() dto: CreateFeedbackDto): Promise<void> {
    await this.feedbackService.create(dto);
  }
}
