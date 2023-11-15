import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signUp(dto);
  }
}
