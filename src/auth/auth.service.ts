import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const expireTime = moment().add(5, 'minutes');
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.SECRET_REFESH,
      }),
      expireTime,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.SECRET_REFESH,
      });
      const payloadRefresh = { sub: payload.sub, role: payload.role };
      const expireTime = moment().add(5, 'minutes');
      return {
        access_token: await this.jwtService.signAsync(payloadRefresh),
        expireTime,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const payload = await this.jwtService.verifyAsync(createUserDto.token, {
        secret: process.env.SECRET_KEY,
      });
      const user = await this.prisma.user.findFirst({
        where: { email: payload.email },
      });
      if (user) {
        return { message: 'Email người dùng đã tồn tại!' };
      }
      // const hashPass = await bcrypt.hash(createUserDto.password, 10);
      const result = await this.prisma.user.create({
        data: {
          ...createUserDto,
          // password: hashPass,
          email: payload.email,
          role: 'USER',
          deleteFlg: false,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...data } = result;
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
