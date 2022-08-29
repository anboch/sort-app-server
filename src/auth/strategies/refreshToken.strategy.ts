import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload, IJwtRefreshPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { cookieNames, IEnvironmentVariables } from '../../common/types';
import { cookieExtractor } from './cookieExtractor';
import { AuthService } from '../auth.service';
import { WRONG_JWT } from '../auth.constants';
import * as argon2 from 'argon2';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET', { infer: true }),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { _id }: IJwtPayload): Promise<IJwtRefreshPayload | void> {
    const userSessions = await this.authService.getSessionsByUserId(_id);

    for (const session of userSessions) {
      if (await argon2.verify(session.refreshTokenHash, req.cookies[cookieNames.REFRESH_TOKEN])) {
        return { _id, sessionId: session._id };
      }
    }
    // todo clear cookies
    throw new UnauthorizedException(WRONG_JWT);
  }
}
