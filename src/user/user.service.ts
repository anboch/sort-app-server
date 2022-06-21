import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
// import { AuthDto } from 'src/auth/dto/authEmail.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './user.constants';
import { UserModel, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

  async create(email: string): Promise<UserModel> {
    const newUser = new this.userModel({ email });
    return newUser.save();
  }

  async find(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
