import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSessionModel, AuthSessionSchema } from '../auth/auth.model';
import { BinModel, BinSchema } from '../bin/bin.model';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: BinModel.name, schema: BinSchema },
      { name: AuthSessionModel.name, schema: AuthSessionSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
