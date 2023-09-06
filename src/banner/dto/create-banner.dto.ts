import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBanner {
  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsString()
  thumbnail: string;
}
