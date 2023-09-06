import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('category')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('Author')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get('/all')
  getCategoryAll(@Query() getCategoryDto: GetCategoryDto) {
    return this.categoryService.getCategoryAll(getCategoryDto);
  }

  @Roles(Role.User)
  @Get()
  getCategory(@Query() getCategoryDto: GetCategoryDto) {
    return this.categoryService.getCategory(getCategoryDto);
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/update/:id_category')
  updateCategoryById(
    @Param('id_category', ParseIntPipe) id_category: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id_category, updateCategoryDto);
  }

  @Put('/delete/:id_category')
  deleteCategoryById(@Param('id_category', ParseIntPipe) id_category: string) {
    return this.categoryService.deleteCategory(id_category);
  }

  @Put('/un-delete/:id_category')
  unDeleteCategoryById(
    @Param('id_category', ParseIntPipe) id_category: string,
  ) {
    return this.categoryService.unDeleteCategory(id_category);
  }
}
