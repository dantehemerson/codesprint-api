import { Category } from '@modules/categories/infra/persistence/typeorm/entities/Category';

export interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  findByTitle(title: string): Promise<Category | undefined>;
  findBySlug(slug: string): Promise<Category | undefined>;
  create(data: Partial<Category>): Promise<Category>;
  save(category: Partial<Category>): Promise<Category>;
}
