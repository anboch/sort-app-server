import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MaterialModel } from './material.model';

@Controller('material')
export class MaterialController {
	@Post('create')
	async create(@Body() dto: Omit<MaterialModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: MaterialModel) {}
}
