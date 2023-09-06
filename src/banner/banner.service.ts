import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBanner } from './dto/create-banner.dto';
import { UpdateBanner } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}
  async createBanner(createBanner: CreateBanner) {
    const data = await this.prisma.banner.create({
      data: createBanner,
    });
    return { status: 200, data };
  }

  async getBanner() {
    const data = await this.prisma.banner.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return { status: 200, data };
  }

  async updateBanner(id, updateBanner: UpdateBanner) {
    const data = await this.prisma.banner.update({
      where: {
        id,
      },
      data: updateBanner,
    });
    return { status: 200, data };
  }

  async deleteBanner(id: string) {
    const data = await this.prisma.banner.delete({
      where: {
        id,
      },
    });
    return { status: 200, data };
  }
}
