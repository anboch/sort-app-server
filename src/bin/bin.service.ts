import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { TypeModel } from 'src/type/type.model';
import { USER_NOT_FOUND_ERROR } from 'src/user/user.constants';
import { UserService } from 'src/user/user.service';
import { BinModel, BinDocument } from './bin.model';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Injectable()
export class BinService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(BinModel.name) private binModel: Model<BinDocument>
  ) {}

  async create(createBinDto: CreateBinDto): Promise<BinModel> {
    // TODO check typeId and preferRPIDs in collections
    const createdModel = new this.binModel(createBinDto);
    return createdModel.save();
  }

  async findByUserID(userId: string): Promise<BinModel[] | null> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
    return this.binModel
      .find({
        _id: {
          $in: user.binIDs,
        },
      })
      .populate([
        {
          path: 'typeID',
          model: TypeModel.name,
        },
      ]);
  }

  async deleteById(_id: string): Promise<{ deletedCount: number }> {
    return this.binModel.deleteOne({ _id }).exec();
  }

  async updateById(_id: string, dto: UpdateBinDto): Promise<BinModel | null> {
    // TODO check typeId and preferRPIDs in collections
    return this.binModel.findByIdAndUpdate(_id, dto, { new: true }).exec();
  }
}
