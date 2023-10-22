import { Controller, Request, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService
  ) { }

  @Get()
  hello(){
    return this.appService.getHello()
  }

  @Post('auth/login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.validateUser(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> { }


  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }



}