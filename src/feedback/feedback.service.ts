import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackDocument, FeedbackModel, FeedbackType } from './feedback.model';

@Injectable()
export class FeedbackService {
  constructor(@InjectModel(FeedbackModel.name) private feedbackModel: Model<FeedbackDocument>) {}

  async create(dto: CreateFeedbackDto): Promise<FeedbackModel> {
    const createdModel = new this.feedbackModel(dto);
    return createdModel.save();
  }

  async writeRequestOfSearchList(): Promise<void> {
    const createdModel = new this.feedbackModel({ type: FeedbackType.SEARCH_LIST_REQUEST });
    await createdModel.save();
  }
}
