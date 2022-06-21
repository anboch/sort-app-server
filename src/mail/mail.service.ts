import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmCode(email: string, confirmCode: string): Promise<void> {
    // TODO host to env
    const url = `http://localhost:5000/api/auth/confirm?email=${email}&confirmCode=${confirmCode}`;

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
