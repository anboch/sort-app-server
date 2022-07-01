import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

  async create(email: string): Promise<UserModel> {
    const newUser = new this.userModel({ email });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(_id: string): Promise<UserModel | null> {
    return this.userModel.findOne({ _id }).exec();
  }

  async deleteById(_id: string): Promise<{ deletedCount: number }> {
    return this.userModel.deleteOne({ _id }).exec();
  }

  async updateById(_id: string, dto: UpdateUserDto): Promise<UserModel | null> {
    return this.userModel.findByIdAndUpdate(_id, dto, { new: true }).exec();
  }
}
