import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsMongoId } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NO_UPDATE_DATA, USER_NOT_FOUND_ERROR, WRONG_ID } from './user.constants';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get()
  async get(@UserId() { id }: GetUserDto): Promise<UserModel> {
    const user = await this.userService.findById(id);
    if (!user) throw new BadRequestException(USER_NOT_FOUND_ERROR);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':paramId')
  async delete(@UserId() { id }: GetUserDto, @Param('paramId') paramId: string): Promise<void> {
    if (id !== paramId) throw new BadRequestException(WRONG_ID);
    const user = await this.userService.deleteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch()
  async patch(@UserId() { id }: GetUserDto, @Body() dto: UpdateUserDto): Promise<UserModel> {
    if (Object.keys(dto).length === 0) throw new BadRequestException(NO_UPDATE_DATA);
    const updatedUser = await this.userService.updateById(id, dto);
    if (!updatedUser) throw new NotFoundException(USER_NOT_FOUND_ERROR);
    return updatedUser;
  }
}
