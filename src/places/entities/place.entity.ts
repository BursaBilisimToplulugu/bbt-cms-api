import { Comment } from 'src/comment/entities/Comment.entity';
import { BaseEntity } from 'src/common/entities/BaseEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Photo } from './Photo.entity';

@Entity()
export class Place extends BaseEntity {
  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  open_address: string;

  @OneToMany(() => Photo, (photo) => photo.place, { cascade: true })
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.place, { cascade: true })
  comments: Comment[];
}
