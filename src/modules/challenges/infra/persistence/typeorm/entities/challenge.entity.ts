import { Category } from '@modules/categories/infra/persistence/typeorm/entities/Category';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  /** Short introduction about what the project is about */
  @Column()
  intro: string;

  @Column({ nullable: true })
  thumbnail: string;

  /** bodyMarkdown parsed to html */
  @Column()
  bodyHtml: string;

  /** content of the challenge in MD */
  @Column()
  bodyMarkdown: string;

  @OneToMany(type => Category, category => category.id)
  categories: string[];

  @OneToOne(type => User, user => user.id)
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
