import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/User.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/Comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Place])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
