import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryModel> {
    return this.categoryService.create(dto);
  }
}
