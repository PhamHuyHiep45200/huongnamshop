import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePassWord } from './dto/changePassword.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResetPassDto } from './dto/resetPassWord.dto';

@ApiTags('user')
@Controller('user')
@Roles(Role.User)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('Author')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  getAllUsers(@Query() queryUser: GetUserDto) {
    return this.userService.getAllUsers(queryUser);
  }

  @Put('/update-user/:id_user')
  updateUser(
    @Param('id_user', ParseIntPipe) id_user: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(updateUserDto, id_user);
  }

  @Put('/delete-user/:id_user')
  deleteUser(@Param('id_user', ParseIntPipe) id_user: string) {
    return this.userService.deleteUser(id_user);
  }

  @Put('/un-delete-user/:id_user')
  unDeleteUser(@Param('id_user', ParseIntPipe) id_user: string) {
    return this.userService.unDeleteUser(id_user);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/change-password/:id')
  async changePassWord(
    @Param('id') id: string,
    @Body() changePassWord: ChangePassWord,
  ) {
    return await this.userService.changePassWord(id, changePassWord);
  }

  @Put('/reset-password')
  async resetPass(@Body() resetPass: ResetPassDto, @Req() req) {
    return await this.userService.resetPass(resetPass, req);
  }
}
