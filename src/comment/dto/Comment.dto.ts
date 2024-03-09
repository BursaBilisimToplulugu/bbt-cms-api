import { IsNotEmpty, IsOptional, Length, Max, Min } from 'class-validator';
import { Place } from 'src/places/entities/place.entity';

export class CommentDto {
  @IsOptional()
  @Length(10, 500)
  text: string;

  @IsNotEmpty()
  @Min(0.0)
  @Max(10.0)
  rating: number;

  @IsNotEmpty()
  place_id: Place['id'];
}
