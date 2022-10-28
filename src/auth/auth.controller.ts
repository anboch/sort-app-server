import { Body, Controller, Get, HttpCode, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Requestor } from '../decorators/user-id.decorator';
import { AuthService, IConfirmRequestInfo, IJWTs } from './auth.service';
import { AuthEmailDto } from './dto/authEmail.dto';
import { ConfirmDto } from './dto/confirm.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { IJwtRefreshPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('request')
  async request(@Body() { email }: AuthEmailDto): Promise<IConfirmRequestInfo> {
    return this.authService.saveAndSendConfirmCode(email);
  }

  @HttpCode(200)
  @Post('confirm')
  async confirm(
    @Body() body: ConfirmDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Pick<IJWTs, 'access_token'>> {
    return this.authService.confirmAndLogin(body, response);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Requestor() requestor: IJwtRefreshPayload,
    @Res({ passthrough: true }) response: Response
  ): Promise<Pick<IJWTs, 'access_token'>> {
    await this.authService.removeSessionEntry(requestor.sessionId);
    return this.authService.login(requestor._id, response);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  async logout(
    @Requestor() requestor: IJwtRefreshPayload,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    await this.authService.logout(requestor.sessionId, response);
  }
}
