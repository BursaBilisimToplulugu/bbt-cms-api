import { BaseEntity } from 'src/common/entities/BaseEntity.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/User.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column({ nullable: true })
  text?: string;

  @Column({ type: 'float' })
  rating: number;

  can_delete?: boolean;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Place, (place) => place.comments)
  place: Place;
}
