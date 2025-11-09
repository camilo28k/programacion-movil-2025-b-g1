import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: CreateAuthDto) {
    return this.authService.registerAndSendToken(registerDto);
  }

  @Post('confirm-token')
  @HttpCode(200)
  async confirmToken(@Body() verifyTokenDto: VerifyTokenDto) {
    console.log('📩 Datos recibidos:', verifyTokenDto);
    return this.authService.activateAccount(verifyTokenDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('resend-token')
  async resendToken(@Body('email') email: string) {
    return this.authService.resendToken(email);
  }
}
