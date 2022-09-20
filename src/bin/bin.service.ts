import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRequestor } from '../auth/interfaces/requestor.interface';
import { AbilityFactory, Action } from '../casl/casl-ability.factory';
import { TypeModel } from '../type/type.model';
import { UserService } from '../user/user.service';
import { BIN_NOT_FOUND_ERROR } from './bin.constants';
import { BinModel, BinDocument } from './bin.model';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Injectable()
export class BinService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(BinModel.name) private binModel: Model<BinDocument>,
    private abilityFactory: AbilityFactory
  ) {}

  async anonFindById(_id: string): Promise<BinModel> {
    const foundBin = await this.binModel.findOne({ _id }).exec();
    if (!foundBin) {
      throw new NotFoundException(BIN_NOT_FOUND_ERROR);
    }
    return foundBin;
  }

  async create(createBinDto: CreateBinDto, requestor: IRequestor): Promise<BinModel> {
    // TODO check if typeId and preferRPIDs are in collections
    const createdModel = new this.binModel(createBinDto);
    const savedModel = await createdModel.save();
    await this.userService.addBinToUser(requestor._id, savedModel._id);
    return savedModel;
  }

  async getAllUserBins(user: IRequestor): Promise<BinModel[] | null> {
    const foundUser = await this.userService.findById(user._id, user);
    return this.binModel
      .find({
        _id: {
          $in: foundUser.binIDs,
        },
      })
      .populate([
        {
          path: 'typeID',
          model: TypeModel.name,
        },
      ])
      .exec();
  }

  async deleteById(_id: string, requestor: IRequestor): Promise<void> {
    const foundBin = await this.anonFindById(_id);
    await this.abilityFactory.checkUserAbility(requestor, Action.Delete, foundBin);
    const { deletedCount } = await this.binModel.deleteOne({ _id }).exec();
    if (deletedCount === 0) {
      throw new NotFoundException(BIN_NOT_FOUND_ERROR);
    }
    await this.userService.delBinFromUser(requestor._id, foundBin._id);
  }

  async updateById(
    { _id, ...propsToUpdate }: UpdateBinDto,
    requestor: IRequestor
  ): Promise<BinModel> {
    // TODO check typeId and preferRPIDs in collections
    const foundBin = await this.anonFindById(_id);
    await this.abilityFactory.checkUserAbility(requestor, Action.Update, foundBin);
    const updatedBin = await this.binModel
      .findByIdAndUpdate(_id, propsToUpdate, { new: true })
      .exec();
    if (!updatedBin) {
      throw new NotFoundException(BIN_NOT_FOUND_ERROR);
    }
    return updatedBin;
  }
}
