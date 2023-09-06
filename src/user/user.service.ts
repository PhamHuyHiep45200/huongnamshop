import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePassWord } from './dto/changePassword.dto';
import { ResetPassDto } from './dto/resetPassWord.dto';
import pagination from 'src/utils/pagination.utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers(getUserDto: GetUserDto) {
    const data = await this.prisma.user.findMany({
      where: {
        email: {
          contains: getUserDto.email,
        },
        name: {
          contains: getUserDto.name,
        },
      },
      skip: getUserDto.skip,
      take: getUserDto.take,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        deleteFlg: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const total = await this.prisma.user.count();

    return {
      data,
      pagination: pagination(getUserDto.skip, getUserDto.take, +total),
    };
  }
  async getUserById(id: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: { id, deleteFlg: false },
    });
  }
  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async deleteUser(idUser: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: idUser, deleteFlg: false },
    });
    if (user) {
      return await this.prisma.user.update({
        where: { id: idUser },
        data: { deleteFlg: true },
      });
    }
    return { message: 'Người dùng không tồn tại hoặc bị khóa!' };
  }
  async unDeleteUser(idUser: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: idUser, deleteFlg: true },
    });
    if (user) {
      return await this.prisma.user.update({
        where: { id: idUser },
        data: { deleteFlg: false },
      });
    }
    return { message: 'Người dùng không tồn tại hoặc bị khóa' };
  }
  async changePassWord(id: string, changePassWord: ChangePassWord) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (user.password === changePassWord.passWord) {
      return await this.prisma.user.update({
        where: { id },
        data: { password: changePassWord.newPassWord },
      });
    } else {
      return { status: 400, message: 'Mật khẩu không chính xác!' };
    }
  }
  async resetPass(resetPass: ResetPassDto, req) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: req.user.sub },
    });
    // const hashPass = await bcrypt.hash(resetPass.passWord, 10);
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: resetPass.passWord,
      },
    });
  }
}
