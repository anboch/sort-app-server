import { Body, Controller, Post } from '@nestjs/common';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('create')
	async create(@Body() dto: CreateCategoryDto): Promise<CategoryModel> {
		return this.categoryService.create(dto);
	}
}
