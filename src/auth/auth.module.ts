import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import {
  AuthConfirmModel,
  AuthConfirmSchema,
  AuthSessionModel,
  AuthSessionSchema,
} from './auth.model';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: AuthConfirmModel.name, schema: AuthConfirmSchema },
      { name: AuthSessionModel.name, schema: AuthSessionSchema },
    ]),
    JwtModule.register({}),
    PassportModule,
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, MailService],
})
export class AuthModule {}
