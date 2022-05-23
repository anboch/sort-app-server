import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserModel } from './user.model';

@Controller('user')
export class UserController {
	@Post('create')
	async create(@Body() dto: Omit<UserModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: UserModel) {}
}
