import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/configs/jwt.config';
import { MailService } from 'src/mail/mail.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthModel, AuthSchema } from './auth.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, MailService],
})
export class AuthModule {}
