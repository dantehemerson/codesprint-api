import { Category } from '@modules/categories/infra/persistence/typeorm/entities/category.entity';

export interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  findByTitle(title: string): Promise<Category | undefined>;
  findBySlug(slug: string): Promise<Category | undefined>;
  create(data: Partial<Category>): Promise<Category>;
  createIfNotExists(
    categories: Array<Partial<Category>>,
  ): Promise<Array<Category>>;
  save(category: Partial<Category>): Promise<Category>;
}
