import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
  imports: [PrismaModule],
})
export class BannerModule {}
