import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
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
import { CommentService } from './comment.service';
import { CommentDto } from './dto/Comment.dto';

@Controller('comment')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':place_id')
  @UseInterceptors(GetUserInterceptor)
  async getCommentsByPostId(
    @Param('place_id', ParseUUIDPipe) place_id: string,
    @Req() req: Request,
  ) {
    return await this.commentService.getCommentsByPlaceId(
      place_id,
      req.user as User,
    );
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access_token')
  @UseInterceptors(GetUserInterceptor)
  @ResponseMessage('Yorum başarıyla eklendi')
  async commentToPlace(@Body() payload: CommentDto, @Req() req: Request) {
    return this.commentService.commentToPlace(payload, req.user as User);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(GetUserInterceptor)
  @ApiBearerAuth('access_token')
  @ResponseMessage('Yorum başarıyla silindi')
  async deleteComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
  ) {
    return this.commentService.deleteComment(id, req.user as User);
  }
}
