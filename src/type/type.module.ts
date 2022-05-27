import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeController } from './type.controller';
import { TypeModel, TypeSchema } from './type.model';
import { TypeService } from './type.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: TypeModel.name, schema: TypeSchema }])],
	controllers: [TypeController],
	providers: [TypeService],
})
export class TypeModule {}
