import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from 'src/user/user.constants';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validate(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
    const user = await this.userService.find(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async signJWT(email: string): Promise<{ access_token: string }> {
    const payload = { email };
    // TODO add refresh
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
