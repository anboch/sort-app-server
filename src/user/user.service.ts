import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  SESSION_NOT_DELETED_ERROR,
  USER_NOT_DELETED_ERROR,
  USER_NOT_FOUND_ERROR,
  USER_NOT_UPDATED_ERROR,
} from './user.constants';
import { UserModel, UserDocument } from './user.model';
import { BinDocument, BinModel } from '../bin/bin.model';
import { IRequestor } from '../auth/interfaces/requestor.interface';
import { AbilityFactory, Action } from '../casl/casl-ability.factory';
import { mongoId } from '../common/types';
import { TypeModel } from '../type/type.model';
import { RecyclePointModel } from '../recycle-point/recycle-point.model';
import { AuthSessionDocument, AuthSessionModel } from '../auth/auth.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    @InjectModel(BinModel.name) private binModel: Model<BinDocument>,
    @InjectModel(AuthSessionModel.name) private authSessionModel: Model<AuthSessionDocument>,
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

  // todo freeze
  async findPopulated(_id: string, requestor: IRequestor): Promise<UserModel> {
    const foundUser = await this.anonFindById(_id);
    await this.abilityFactory.checkUserAbility(requestor, Action.Read, foundUser);
    const populatedUser = await this.anonFindPopulated(_id);
    return populatedUser;
  }

  // todo freeze
  async anonFindPopulated(_id: string): Promise<UserModel> {
    const foundUser = await this.userModel
      .findById(_id)
      .populate([
        {
          path: 'binIDs',
          model: BinModel.name,
          populate: {
            path: 'typeID',
            model: TypeModel.name,
          },
        },
        {
          path: 'recyclePointIDs',
          model: RecyclePointModel.name,
        },
      ])
      .exec();
    if (!foundUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return foundUser;
  }

  async anonFindById(_id: string): Promise<UserModel> {
    const foundUser = await this.userModel.findById(_id).exec();
    if (!foundUser) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return foundUser;
  }

  async deleteById(userId: string, requestor: IRequestor): Promise<void> {
    const foundUser = await this.anonFindById(userId);
    await this.abilityFactory.checkUserAbility(requestor, Action.Delete, foundUser);
    if (foundUser.binIDs) {
      for (const binId of foundUser.binIDs) {
        await this.binModel.deleteOne({ _id: binId }).exec();
      }
    }

    // todo to know is it ok to use models from auth module to avoid circular dependency (if import AuthService)
    const { deletedCount: deletedSessionsCount } = await this.authSessionModel
      .deleteMany({ userID: userId })
      .exec();
    if (deletedSessionsCount === 0) {
      throw new InternalServerErrorException(SESSION_NOT_DELETED_ERROR);
    }

    const { deletedCount: deletedUsersCount } = await this.userModel
      .deleteOne({ _id: userId })
      .exec();
    if (deletedUsersCount === 0) {
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
