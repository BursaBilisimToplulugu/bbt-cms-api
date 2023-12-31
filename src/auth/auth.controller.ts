import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ResponseMessage } from 'src/common/decorators/ResponseMessage.decorator';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';
import { User } from '../users/entities/User.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ResponseMessage('Başarıyla kayıt olundu')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('/login')
  @ResponseMessage('Başarıyla giriş yapıldı')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Delete('/logout')
  @UseInterceptors(GetUserInterceptor)
  @ResponseMessage('Başarıyla çıkış yapıldı')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const user = req.user as User;
    await this.authService.logout(user.id);
    res.clearCookie('access_token');
  }

  @Post('/refresh-token')
  @ResponseMessage('Başarıyla token yenilendi')
  async refreshToken(@Req() req: Request) {
    const { refresh_token } = req.headers;
    return await this.authService.refresh(refresh_token as string);
  }
}
