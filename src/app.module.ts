import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialModule } from './material/material.module';
import { BinModule } from './bin/bin.module';
import { TypeModule } from './type/type.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RecyclePointModule } from './recycle-point/recycle-point.module';
import { TagModule } from './tag/tag.module';
import { RuleModule } from './rule/rule.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CaslModule } from './casl/casl.module';
import { RuleSetModule } from './rule-set/rule-set.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    MaterialModule,
    BinModule,
    TypeModule,
    UserModule,
    RecyclePointModule,
    TagModule,
    RuleModule,
    MailModule,
    CaslModule,
    RuleSetModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
