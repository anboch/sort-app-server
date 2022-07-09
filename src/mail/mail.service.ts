import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  async sendConfirmCode(email: string, confirmCode: string): Promise<void> {
    const host = this.configService.get('HOST');
    const url = `${host}/api/auth/confirm?email=${email}&confirmCode=${confirmCode}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation',
      context: {
        url,
      },
    });
  }
}
