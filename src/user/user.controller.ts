import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { cookieOptions } from '../auth/auth.service';

import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { IRequestor } from '../auth/interfaces/requestor.interface';
import { cookieNames, ParamId } from '../common/types';
import { Requestor } from '../decorators/user-id.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { NO_UPDATE_DATA, USER_NOT_FOUND_ERROR, WRONG_ID } from './user.constants';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get(@Requestor() requestor: IRequestor): Promise<UserModel> {
    // return this.userService.findPopulated(requestor._id, requestor);
    return this.userService.findById(requestor._id, requestor);
  }

  @Delete(':id')
  async delete(
    @Requestor() requestor: IRequestor,
    @Param() params: ParamId,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    await this.userService.deleteById(params.id, requestor);
    response.clearCookie(cookieNames.REFRESH_TOKEN, cookieOptions);
  }

  @Patch('')
  async patch(
    @Requestor() requestor: IRequestor,
    // @Param() params: ParamId,
    @Body() dto: UpdateUserDto
  ): Promise<UserModel> {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException(NO_UPDATE_DATA);
    }
    return this.userService.updateById(requestor._id, dto, requestor);
    // return this.userService.updateById(params.id, dto, requestor);
  }
}
