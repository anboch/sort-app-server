import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { Model } from 'mongoose';
import { cookieNames, IEnvironmentVariables, mongoId } from '../common/types';
import { MailService } from '../mail/mail.service';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ALREADY_REQUESTED_ERROR, CODE_EXPIRED, WRONG_CODE } from './auth.constants';
import {
  AuthConfirmDocument,
  AuthConfirmModel,
  AuthSessionModel,
  AuthSessionDocument,
} from './auth.model';
import { ConfirmDto } from './dto/confirm.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

export interface IJWTs {
  access_token: string;
  refresh_token: string;
}

export interface IConfirmRequestInfo {
  email: string;
  codeExpirationTime: number;
}

// todo from config
const JWT_REFRESH_EXPIRES_IN_sec = 60 * 60 * 24 * 180;
// TODO set cookie flags (secure: process.env.NODE_ENV !== "development")(and path:)
const cookieOptions = {
  // secure: true,
  httpOnly: true,
  maxAge: 1000 * JWT_REFRESH_EXPIRES_IN_sec,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<IEnvironmentVariables>,
    @InjectModel(AuthConfirmModel.name) private authConfirmModel: Model<AuthConfirmDocument>,
    @InjectModel(AuthSessionModel.name) private authSessionModel: Model<AuthSessionDocument>
  ) {}

  isConfirmCodeExpired(lastConfirmReqDate = 0): Boolean {
    const currentConfirmDelay = Date.now() - lastConfirmReqDate;
    return currentConfirmDelay > this.getMinConfirmDelay();
  }

  getMinConfirmDelay(): number {
    return Number(this.configService.get('MIN_CONFIRM_DELAY_SEC', { infer: true })) * 1000;
  }

  async saveConfirmCode(email: string, codeHash: string): Promise<AuthConfirmModel> {
    const query: Pick<AuthConfirmModel, 'email'> = { email };
    const update: Pick<AuthConfirmModel, 'codeHash' | 'createdAt'> = {
      codeHash,
      createdAt: Date.now(),
    };
    return this.authConfirmModel
      .findOneAndUpdate(query, update, { upsert: true, new: true })
      .exec();
  }

  async removeConfirmEntry(email: string): Promise<{ deletedCount: number }> {
    return this.authConfirmModel.deleteOne({ email }).exec();
    // TODO catch potential error (deletedCount === 0)
  }

  async saveAndSendConfirmCode(email: string): Promise<IConfirmRequestInfo> {
    // const delay = (time: number) => {
    //   return new Promise((res) => {
    //     setTimeout(res, time);
    //   });
    // };
    // console.log('delay1:', new Date());
    // await delay(3000);
    // console.log('delay2:', new Date());
    const confirmRequest = await this.authConfirmModel.findOne({ email }).exec();
    if (confirmRequest && !this.isConfirmCodeExpired(confirmRequest?.createdAt)) {
      return { email, codeExpirationTime: confirmRequest?.createdAt + this.getMinConfirmDelay() };
    }
    if (confirmRequest && this.isConfirmCodeExpired(confirmRequest?.createdAt)) {
      await this.removeConfirmEntry(email);
    }
    const confirmCode = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await argon2.hash(confirmCode);
    // TODO catch potential error
    const newConfirmRequest = await this.saveConfirmCode(email, codeHash);
    // TODO catch potential error
    await this.mailService.sendConfirmCode(email, confirmCode);

    return { email, codeExpirationTime: newConfirmRequest?.createdAt + this.getMinConfirmDelay() };
  }

  async confirmAndLogin(
    { email, confirmCode }: ConfirmDto,
    response: Response
  ): Promise<Pick<IJWTs, 'access_token'>> {
    // const delay = (time: number) => {
    //   return new Promise((res) => {
    //     setTimeout(res, time);
    //   });
    // };
    // console.log('delay1:', new Date());
    // await delay(3000);
    // console.log('delay2:', new Date());

    const confirmRequest = await this.authConfirmModel.findOne({ email }).exec();
    // TODO add error when the code just don't exist
    if (this.isConfirmCodeExpired(confirmRequest?.createdAt)) {
      throw new BadRequestException(CODE_EXPIRED);
    }
    const isCorrectCode = await argon2.verify(confirmRequest?.codeHash ?? '', confirmCode);
    if (!isCorrectCode) {
      throw new BadRequestException(WRONG_CODE);
    }
    await this.removeConfirmEntry(email);

    let existUser = await this.userService.findByEmail(email);
    if (!existUser) {
      existUser = await this.userService.create(email);
    }

    return this.login(existUser._id.toString(), response);
  }

  async login(userId: string, response: Response): Promise<Pick<IJWTs, 'access_token'>> {
    const payload: IJwtPayload = { _id: userId };
    const { access_token, refresh_token } = await this.getJWTs(payload);
    await this.saveRefreshTokenHash(userId, refresh_token);

    response.cookie(cookieNames.REFRESH_TOKEN, refresh_token, cookieOptions);
    return { access_token };
  }

  async logout(sessionId: mongoId, response: Response): Promise<void> {
    await this.removeSessionEntry(sessionId);
    response.clearCookie(cookieNames.REFRESH_TOKEN, cookieOptions);
  }

  async removeSessionEntry(sessionId: mongoId): Promise<{ deletedCount: number }> {
    return this.authSessionModel.deleteOne({ _id: sessionId }).exec();
    // TODO catch potential error (deletedCount === 0)
  }

  async saveRefreshTokenHash(
    userID: string,
    refreshToken: AuthSessionModel['refreshTokenHash']
  ): Promise<AuthSessionModel> {
    const newSession = new this.authSessionModel({
      userID,
      refreshTokenHash: await argon2.hash(refreshToken),
    });
    return newSession.save();
  }

  async getSessionsByUserId(userID: string): Promise<AuthSessionModel[]> {
    return this.authSessionModel.find({ userID }, ['refreshTokenHash']).exec();
  }

  async getJWTs(payload: IJwtPayload): Promise<IJWTs> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET', { infer: true }),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', { infer: true }),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET', { infer: true }),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', { infer: true }),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
