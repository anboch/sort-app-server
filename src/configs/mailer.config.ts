import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { IEnvironmentVariables } from '../common/types';

export const getMailerConfig = async (
  configService: ConfigService<IEnvironmentVariables>
): Promise<MailerOptions> => ({
  transport: {
    host: configService.get('MAIL_HOST', { infer: true }),
    secure: false,
    auth: {
      user: configService.get('MAIL_USER', { infer: true }),
      pass: configService.get('MAIL_PASSWORD', { infer: true }),
    },
  },
  defaults: {
    from: `"В-Переработку" <${configService.get('MAIL_FROM', { infer: true })}>`,
  },
  template: {
    dir: join(__dirname, '../mail/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
