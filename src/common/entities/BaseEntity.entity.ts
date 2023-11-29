import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  created_at: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deleted_at: Date;
}
