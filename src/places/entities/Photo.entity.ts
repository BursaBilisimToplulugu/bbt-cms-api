import { BaseEntity } from 'src/common/entities/BaseEntity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Place } from './place.entity';

@Entity()
export class Photo extends BaseEntity {
  @Column()
  url: string;

  @ManyToOne(() => Place, (place) => place.photos)
  place: Place;
}
