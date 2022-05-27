import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { BinModule } from './bin/bin.module';
import { TypeModule } from './type/type.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RecyclePointModule } from './recycle-point/recycle-point.module';
import { ClusterModule } from './cluster/cluster.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMongoConfig,
			inject: [ConfigService],
		}),
		AuthModule,
		MaterialModule,
		BinModule,
		TypeModule,
		UserModule,
		RecyclePointModule,
		ClusterModule,
		CategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
