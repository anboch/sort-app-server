import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from '../common/types';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService<IEnvironmentVariables>
  ) {}

  async sendConfirmCode(email: string, confirmCode: string): Promise<void> {
    console.log('sendConfirmCode email:', email);
    console.log('confirmCode:', confirmCode);
    // const host = this.configService.get('CLIENT_URL', { infer: true });
    // const url = `${host}/api/auth/confirm?email=${email}&confirmCode=${confirmCode}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to RB App! Confirm your Email',
      template: 'confirmation',
      context: {
        confirmCode,
      },
    });
  }
}
