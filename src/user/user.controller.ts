import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IRequestor } from '../auth/interfaces/requestor.interface';
import { ParamId } from '../common/types';
import { Requestor } from '../decorators/user-id.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { NO_UPDATE_DATA, USER_NOT_FOUND_ERROR, WRONG_ID } from './user.constants';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async get(@Requestor() requestor: IRequestor, @Param() params: ParamId): Promise<UserModel> {
    return this.userService.findById(params.id, requestor);
  }

  @Delete(':id')
  async delete(@Requestor() requestor: IRequestor, @Param() params: ParamId): Promise<void> {
    return this.userService.deleteById(params.id, requestor);
  }

  @Patch(':id')
  async patch(
    @Requestor() requestor: IRequestor,
    @Param() params: ParamId,
    @Body() dto: UpdateUserDto
  ): Promise<UserModel> {
    if (Object.keys(dto).length === 0) throw new BadRequestException(NO_UPDATE_DATA);
    return this.userService.updateById(params.id, dto, requestor);
  }
}
