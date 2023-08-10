import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  controllers: [MailController],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dev.yarrow@gmail.com',
          pass: 'scywllrijndyodzt',
        },
      },
      defaults: {
        from: '"nest-modules" <dev.yarrow@gmail.com>',
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
