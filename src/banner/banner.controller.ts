import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBanner } from './dto/create-banner.dto';
import { UpdateBanner } from './dto/update-banner.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('banner')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('Author')
@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Post()
  createBanner(@Body() createBanner: CreateBanner) {
    return this.bannerService.createBanner(createBanner);
  }
  @Get()
  getBanner() {
    return this.bannerService.getBanner();
  }
  @Put('/:id')
  updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBanner: UpdateBanner,
  ) {
    return this.bannerService.updateBanner(id, updateBanner);
  }
  @Delete('/:id')
  deleteBanner(@Param('id', ParseIntPipe) id: string) {
    return this.bannerService.deleteBanner(id);
  }
}
