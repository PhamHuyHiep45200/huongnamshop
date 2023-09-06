import { ApiProperty } from '@nestjs/swagger';

export class ChangePassWord {
  @ApiProperty()
  passWord: string;

  @ApiProperty()
  newPassWord: string;
}
