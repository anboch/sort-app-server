import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateUserDto): Promise<UserModel> {
    return this.userService.create(dto);
  }

  // @Get(':id')
  // async get(@Param('id') id: string) {}

  // @Delete(':id')
  // async delete(@Param('id') id: string) {}

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: UserModel) {}
}
