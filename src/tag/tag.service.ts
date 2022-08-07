import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagModel, TagDocument } from './tag.model';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(TagModel.name) private tagModel: Model<TagDocument>) {}

  async create(createTagDto: CreateTagDto): Promise<TagModel> {
    const createdModel = new this.tagModel(createTagDto);
    return createdModel.save();
  }
}
