import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegiterMailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
