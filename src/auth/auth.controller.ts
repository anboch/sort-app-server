import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from 'src/user/user.constants';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() authDto: AuthDto): Promise<UserModel> {
    const oldUser = await this.userService.find(authDto.email);
    if (oldUser) throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    return this.userService.create(authDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<{ access_token: string }> {
    const { email } = await this.authService.validate(authDto.email, authDto.password);
    return this.authService.signJWT(email);
  }
}
