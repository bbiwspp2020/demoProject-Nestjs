import { Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Post('auth/login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.validateUser(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

 

}