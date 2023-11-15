import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

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
}
