import { ApiProperty } from '@nestjs/swagger';

export class ResetPassDto {
  @ApiProperty()
  passWord: string;
}
