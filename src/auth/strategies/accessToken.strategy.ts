import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IEnvironmentVariables } from '../../common/types';
import { UserService } from '../../user/user.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IRequestor } from '../interfaces/requestor.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables>,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET', { infer: true }),
    });
  }

  async validate({ _id }: IJwtPayload): Promise<IRequestor> {
    const { role, binIDs } = await this.userService.anonFindById(_id);
    // TODO id to mongoId type
    return { _id, role, binIDs };
  }
}
