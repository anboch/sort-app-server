import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModel, AuthDocument } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectModel(AuthModel.name) private authModel: Model<AuthDocument>
  ) {}

  async signJWT(_id: string): Promise<{ access_token: string }> {
    const payload = { _id };
    // TODO add refresh
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async find(email: string): Promise<AuthModel | null> {
    return this.authModel.findOne({ email }).exec();
  }

  async saveConfirmCode(email: string, confirmCode: string): Promise<AuthModel> {
    const createdModel = new this.authModel({ email, confirmCode });
    return createdModel.save();
  }

  async deleteConfirmCode(email: string): Promise<{ deletedCount: number }> {
    return this.authModel.deleteOne({ email }).exec();
  }

  async saveAndSendConfirmCode(email: string): Promise<void> {
    const confirmCode = Math.floor(Math.random() * 1000000).toString();
    const savedModel = await this.saveConfirmCode(email, confirmCode);
    // TODO catch potential error
    await this.mailService.sendConfirmCode(savedModel.email, savedModel.confirmCode);
    // TODO catch potential error
  }

  async login(email: string): Promise<{ access_token: string }> {
    await this.deleteConfirmCode(email);
    let existUser = await this.userService.findByEmail(email);
    if (!existUser) {
      existUser = await this.userService.create(email);
    }
    return this.signJWT(existUser._id.toString());
  }
}
