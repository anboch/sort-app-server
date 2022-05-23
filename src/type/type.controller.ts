import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TypeModel } from './type.model';

@Controller('type')
export class TypeController {
	@Post('create')
	async create(@Body() dto: Omit<TypeModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TypeModel) {}
}
