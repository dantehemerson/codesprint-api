import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/Category';
import { getRepository, Repository } from 'typeorm';

export class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);

    return category;
  }

  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { title } });
    return category;
  }

  async findBySlug(slug: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ where: { slug } });
    return category;
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = await this.ormRepository.create(categoryData);
    return this.save(category);
  }

  async save(category: Partial<Category>): Promise<Category> {
    return this.ormRepository.save(category);
  }
}
