import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteUser(jwtUser: User) {
    const user = await this.prisma.user.findUnique({
      where: { email: jwtUser.email },
    });
    if (user) {
      console.log(user);
      return await this.prisma.user.delete({ where: { email: user.email } });
    }
    return 'No Such user in db';
  }

  async getUser(jwtUser: User) {
    const user = await this.prisma.user.findUnique({
      where: { email: jwtUser.email },
    });

    return user;
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }
}
