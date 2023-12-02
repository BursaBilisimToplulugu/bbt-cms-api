import {
  Body,
  Controller,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/Auth.guard';
import { ResponseMessage } from 'src/common/decorators/ResponseMessage.decorator';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';
import { User } from 'src/users/entities/User.entity';
import { UpdateProfileDto } from './dto/Profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Put('/')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard)
  @UseInterceptors(GetUserInterceptor)
  @ResponseMessage('Profiliniz başarıyla güncellendi.')
  async updateProfile(@Body() payload: UpdateProfileDto, @Req() req: Request) {
    return await this.profileService.updateProfile(req.user as User, payload);
  }
}
