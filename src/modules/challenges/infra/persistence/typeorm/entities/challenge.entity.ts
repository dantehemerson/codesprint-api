import { Category } from '@modules/categories/infra/persistence/typeorm/entities/category.entity';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
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
  @Column({ type: 'text' })
  bodyHtml: string;

  /** content of the challenge in MD */
  @Column({ type: 'text' })
  bodyMarkdown: string;

  @ManyToMany(type => Category, category => category.id)
  @JoinTable()
  categories: string[];

  @ManyToOne(type => User, user => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
