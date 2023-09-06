import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { JwtService } from '@nestjs/jwt';
import { RegiterMailDto } from './dto/register.sto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: any = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMailRegister(mail: RegiterMailDto) {
    const token = await this.jwtService.signAsync({
      sub: mail.email,
    });
    try {
      await this.setTransport();
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to: mail.email, // list of receivers
        from: 'huyhiep4520@gmail.com', // sender address
        subject: 'Đăng Kí ✔', // Subject line
        template: './templates/register',
        context: {
          user: mail.email,
          token,
        },
      });
      return { message: 'success' };
    } catch (error) {
      console.log(error);
    }
  }

  async sendMailForgot(mail: RegiterMailDto) {
    const token = await this.jwtService.signAsync({
      sub: mail.email,
    });
    try {
      await this.setTransport();
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to: mail.email, // list of receivers
        from: 'HuongNamShop@gmail.com', // sender address
        subject: 'Quên Mật Khẩu ✔', // Subject line
        template: './templates/forgot',
        context: {
          user: mail.email,
          token,
        },
      });
      return { message: 'success' };
    } catch (error) {
      console.log(error);
    }
  }
}
