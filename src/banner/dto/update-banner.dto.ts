import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateBanner {
  @ApiProperty()
  @IsString()
  @IsOptional()
  link: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnail: string;
}
