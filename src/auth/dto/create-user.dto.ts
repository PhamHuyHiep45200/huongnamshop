import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsOptional()
  thumnail: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  token: string;

  @ApiProperty({ default: false })
  deleteFlg?: boolean;
}
