import { Exclude } from 'class-transformer';
import { Comment } from 'src/comment/entities/Comment.entity';
import { BaseEntity } from 'src/common/entities/BaseEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  full_name: string;

  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  picture_url: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
