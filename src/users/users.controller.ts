import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/Auth.guard';
import { RoleGuard } from 'src/auth/guards/Role.guard';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';
import { User } from './entities/User.entity';
import { UserService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //get all users
  @ApiOperation({ summary: 'Admin Only' })
  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access_token')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch('/update-profile-picture')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access_token')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(GetUserInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateProfilePicture(
    @UploadedFile('file') file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.usersService.updateProfilePicture(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  @ApiOperation({ summary: 'Admin Only' })
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access_token')
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  //update user
  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access_token')
  async update(@Param('id') id: string, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(':id')
  @ApiOperation({ summary: 'Admin Only' })
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('access_token')
  async delete(@Param('id') id: string): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }
}
