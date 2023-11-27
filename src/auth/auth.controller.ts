import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/Auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }
}
