import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BinModel } from '../bin/bin.model';
import { BinService } from '../bin/bin.service';
import { CreateRecyclePointDto } from './dto/create-recycle-point.dto';
import { RecyclePointDocument, RecyclePointModel } from './recycle-point.model';

@Injectable()
export class RecyclePointService {
  constructor(
    @InjectModel(RecyclePointModel.name) private recyclePointModel: Model<RecyclePointDocument>
  ) {}

  async create(createRecyclePointDto: CreateRecyclePointDto): Promise<RecyclePointModel> {
    const createdModel = new this.recyclePointModel(createRecyclePointDto);
    return createdModel.save();
  }

  async getByIds(ids: string[]): Promise<RecyclePointModel[]> {
    return this.recyclePointModel.find({ _id: { $in: ids } }).exec();
  }
}
