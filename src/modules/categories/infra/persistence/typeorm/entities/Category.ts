import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  parent_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  /** Color to diferenciate the category */
  @Column({ default: '#00000000' })
  color: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
