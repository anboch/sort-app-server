import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from 'src/user/user.constants';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validate(login: string, password: string): Promise<Pick<UserModel, 'login'>> {
    const user = await this.userService.find(login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { login: user.login };
  }

  async signJWT(login: string): Promise<{ access_token: string }> {
    const payload = { login };
    // TODO add refresh
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
