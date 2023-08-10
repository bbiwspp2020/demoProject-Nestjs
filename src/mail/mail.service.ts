import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(
    private MailerService: MailerService
  ) { }
  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }

  async postMail(user: any) {
    let { to, from, text } = user
    try {
      await this.MailerService.sendMail({
        to: user.email,
        subject: 'Welcome to APPs!',
        template: './confirmation',
        context: {
          text: user.text,
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: 'พร้อมใช้งาน ',
      },
      })
      return {
        message: 'send success'
      }
    } catch (error) {
      console.log(error)
    }
  }
}
