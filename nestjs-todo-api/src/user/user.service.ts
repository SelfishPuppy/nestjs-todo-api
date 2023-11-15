import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async deleteUser(jwtUser: User) {
    return this.prisma.user.delete({ where: { email: jwtUser.email } });
  }

  async getUser(jwtUser: User) {
    return await this.prisma.user.findUnique({
      where: { email: jwtUser.email },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  async updateUser(jwtUser: User, dto: UserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { email: jwtUser.email },
        data: dto,
      });
      return this.authService.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    jwtUser: User,
    password: string,
  ): Promise<{ access_token: string }> {
    const hash = await argon.hash(password);
    const user = await this.prisma.user.update({
      where: { email: jwtUser.email },
      data: { hash: hash },
    });
    const access_token = this.authService.signToken(user.id, user.email);

    return access_token;
  }
}
