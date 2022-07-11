import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BinModel, BinSchema } from '../bin/bin.model';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: BinModel.name, schema: BinSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
