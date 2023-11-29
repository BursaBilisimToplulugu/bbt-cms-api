import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/User.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/Comment.dto';
import { Comment } from './entities/Comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}

  async getCommentsByPlaceId(place_id: Place['id'], user: User) {
    const place = await this.placeRepository.findOne({
      where: { id: place_id },
    });
    if (!place) throw new NotFoundException('Böyle bir mekan yok !');
    const comments = await this.commentRepository.find({
      where: { place: { id: place_id } },
      relations: { user: true },
      order: { created_at: 'DESC', rating: 'ASC' },
    });
    return comments.map((comment) => {
      if (user && comment.user.id === user.id) {
        comment.can_delete = true;
      } else comment.can_delete = false;
      return comment;
    });
  }

  async commentToPlace(payload: CommentDto, user: User) {
    const comment = this.commentRepository.create(payload);
    const usersComment = await this.commentRepository.findOne({
      where: { user: { id: user.id }, place: { id: payload.place_id } },
    });
    if (usersComment)
      throw new BadRequestException('Bu mekana daha önce yorum yaptınız !');
    const place = await this.placeRepository.findOne({
      where: { id: payload.place_id },
      relations: { comments: true },
    });
    if (!place) throw new NotFoundException('Böyle bir mekan yok !');
    comment.place = place;
    comment.user = user;
    const allComments = [...place.comments, comment];
    const placeRating =
      allComments.reduce((acc, comment) => acc + comment.rating, 0) /
      allComments.length;
    place.rating = parseFloat(placeRating.toFixed(1));

    this.placeRepository.save(place);

    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: Comment['id'], user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (user.role !== 'admin' && comment.user.id !== user.id) {
      throw new UnauthorizedException('Bu yorumu silemezsiniz !');
    }
    return await this.commentRepository.softDelete({ id });
  }
}
