import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeModel } from './type.model';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
	constructor(private readonly typeService: TypeService) {}

	@Post('create')
	async create(@Body() dto: CreateTypeDto): Promise<TypeModel> {
		return this.typeService.create(dto);
	}

	// @Get(':id')
	// async get(@Param('id') id: string) {}

	// @Delete(':id')
	// async delete(@Param('id') id: string) {}

	// @Patch(':id')
	// async patch(@Param('id') id: string, @Body() dto: TypeModel) {}
}
