import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getUser(@GetUser() jwtUser: User) {
    return this.userService.getUser(jwtUser);
  }

  @Get('getAll')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('delete-me')
  deleteUser(@GetUser() jwtUser: User) {
    return this.userService.deleteUser(jwtUser);
  }

  @Patch('update-me')
  updateUser(@GetUser() jwtUser: User, @Body() userDto: UserDto) {
    return this.userService.updateUser(jwtUser, userDto);
  }

  @Patch('change-password')
  changePassword(@GetUser() jwtUser: User, @Body('password') password: string) {
    return this.userService.changePassword(jwtUser, password);
  }
}
