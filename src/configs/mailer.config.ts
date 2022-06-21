import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const getMailerConfig = async (config: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: config.get('MAIL_HOST'),
    secure: false,
    auth: {
      user: config.get('MAIL_USER'),
      pass: config.get('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"No Reply" <${config.get('MAIL_FROM')}>`,
  },
  template: {
    dir: join(__dirname, '../mail/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
