import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CheckAbilities } from 'src/casl/casl-abilities.decorator';
import { AbilityGuard } from 'src/casl/casl-abilities.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @CheckAbilities({ action: Action.Create, subject: CategoryModel })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryModel> {
    return this.categoryService.create(dto);
  }
}
