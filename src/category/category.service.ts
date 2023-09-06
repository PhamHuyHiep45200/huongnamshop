import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import pagination from 'src/utils/pagination.utils';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async getCategoryAll(getCategoryDto: GetCategoryDto) {
    const data = await this.prisma.category.findMany({
      where: {
        name: {
          contains: getCategoryDto.name,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const total = await this.prisma.category.count();

    return {
      pagination: pagination(getCategoryDto.skip, getCategoryDto.take, +total),
      data,
    };
  }
  async getCategory(getCategoryDto: GetCategoryDto) {
    const data = await this.prisma.category.findMany({
      where: {
        deleteFlg: false,
        name: {
          contains: getCategoryDto.name,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const total = await this.prisma.category.count();

    return {
      pagination: pagination(getCategoryDto.skip, getCategoryDto.take, +total),
      data,
    };
  }
  async getCategoryById(id: string) {
    const data = await this.prisma.category.findFirstOrThrow({
      where: {
        deleteFlg: false,
        id,
      },
      orderBy: { updatedAt: 'desc' },
    });
    return {
      status: 200,
      data,
    };
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const data = await this.prisma.category.create({
      data: { ...createCategoryDto, deleteFlg: false },
    });
    return { status: 200, data };
  }
  async updateCategory(
    id_category: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.prisma.category.update({
      where: { id: id_category },
      data: { ...updateCategoryDto },
    });
    return { status: 200, data };
  }
  async deleteCategory(id_category: string) {
    const data = await this.prisma.category.update({
      where: { id: id_category },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
  async unDeleteCategory(id_category: string) {
    const data = await this.prisma.category.update({
      where: { id: id_category },
      data: { deleteFlg: false },
    });
    return { status: 200, data };
  }
}
