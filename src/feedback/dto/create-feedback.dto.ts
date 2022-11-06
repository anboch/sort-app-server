import { Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { FeedbackType } from '../feedback.model';

export class CreateFeedbackDto {
  @IsEnum(FeedbackType)
  type: FeedbackType;

  @IsString()
  description: string;
}
