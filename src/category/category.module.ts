import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryModel, CategorySchema } from './category.model';
import { CategoryService } from './category.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CategoryModel.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
