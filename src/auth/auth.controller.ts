import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REQUESTED_ERROR, CODE_EXPIRED, WRONG_CODE } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthEmailDto } from './dto/authEmail.dto';
import { ConfirmDto } from './dto/confirm.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('request')
  async request(@Body() { email }: AuthEmailDto): Promise<void> {
    const authRequest = await this.authService.find(email);
    if (authRequest) throw new BadRequestException(ALREADY_REQUESTED_ERROR);
    await this.authService.saveAndSendConfirmCode(email);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('confirm')
  async confirm(@Query() query: ConfirmDto): Promise<{ access_token: string }> {
    const authRequest = await this.authService.find(query.email);
    if (!authRequest) throw new BadRequestException(CODE_EXPIRED);
    if (query.confirmCode !== authRequest.confirmCode) {
      throw new BadRequestException(WRONG_CODE);
    }
    return this.authService.login(query.email);
  }
}
