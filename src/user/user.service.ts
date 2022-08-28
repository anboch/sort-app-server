import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  USER_NOT_DELETED_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_NOT_UPDATED_ERROR,
} from './user.constants';
import { UserModel, UserDocument } from './user.model';
import { BinDocument, BinModel } from '../bin/bin.model';
import { IRequestor } from '../auth/interfaces/requestor.interface';
import { AbilityFactory, Action } from '../casl/casl-ability.factory';
import { BinService } from '../bin/bin.service';
import { mongoId } from '../common/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    @InjectModel(BinModel.name) private binModel: Model<BinDocument>,
    private abilityFactory: AbilityFactory
  ) {}

  async create(email: string): Promise<UserModel> {
    const newUser = new this.userModel({ email });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(_id: string, requestor: IRequestor): Promise<UserModel> {
    const foundUser = await this.anonFindById(_id);
    await this.abilityFactory.checkUserAbility(requestor, Action.Read, foundUser);
    return foundUser;
  }

  async anonFindById(_id: string): Promise<UserModel> {
    const foundUser = await this.userModel.findOne({ _id }).exec();
    if (!foundUser) throw new NotFoundException(USER_NOT_FOUND_ERROR);
    return foundUser;
  }

  async deleteById(_id: string, requestor: IRequestor): Promise<void> {
    const foundUser = await this.anonFindById(_id);
    await this.abilityFactory.checkUserAbility(requestor, Action.Delete, foundUser);
    for (const _id of foundUser.binIDs) {
      await this.binModel.deleteOne({ _id }).exec();
    }
    const { deletedCount } = await this.userModel.deleteOne({ _id }).exec();
    if (deletedCount === 0) {
      throw new InternalServerErrorException(USER_NOT_DELETED_ERROR);
    }
  }

  async updateById(_id: string, dto: UpdateUserDto, requestor: IRequestor): Promise<UserModel> {
    const foundUser = await this.anonFindById(_id);
    await this.abilityFactory.checkUserAbility(requestor, Action.Update, foundUser);
    const updatedUser = await this.userModel.findByIdAndUpdate(_id, dto, { new: true }).exec();
    if (!updatedUser) {
      throw new InternalServerErrorException(USER_NOT_UPDATED_ERROR);
    }
    return updatedUser;
  }

  async addBinToUser(userId: string, binId: mongoId): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $push: { binIDs: binId } }).exec();
  }

  async delBinFromUser(userId: string, binId: Pick<BinModel, '_id'>): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $pull: { binIDs: binId } }).exec();
  }
}
