import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { RegiterMailDto } from './dto/register.sto';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(readonly mailService: MailService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  public sendMail(@Body() mail: RegiterMailDto) {
    this.mailService.sendMailRegister(mail);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/forgot-passwork')
  public sendMailForgot(@Body() mail: RegiterMailDto) {
    this.mailService.sendMailForgot(mail);
  }
}
