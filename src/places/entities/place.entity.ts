import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

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
}
