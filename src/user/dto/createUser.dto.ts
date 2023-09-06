import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  thumnail: string;

  @ApiProperty()
  role: Role;

  @ApiProperty({ default: false })
  deleteFlg?: boolean;
}
