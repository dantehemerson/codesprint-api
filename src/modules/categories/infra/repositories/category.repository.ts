import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/category.entity';
import { getRepository, In, Repository } from 'typeorm';

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

  async createIfNotExists(
    categories: Array<Partial<Category>>,
  ): Promise<Array<Category>> {
    const categorySlugs = categories.map(category => category.slug);

    const existentCategories = await this.ormRepository.find({
      where: { slug: In(categorySlugs) },
    });

    const notExistentCategories = categories.filter(
      category =>
        !existentCategories.some(existent => category.slug === existent.slug),
    );

    if (notExistentCategories.length === 0) {
      return existentCategories;
    }

    const insertedCategories = await this.ormRepository
      .createQueryBuilder()
      .insert()
      .values(notExistentCategories)
      .returning('*')
      .execute();

    existentCategories.push(...insertedCategories.raw);

    return existentCategories;
  }

  async save(category: Partial<Category>): Promise<Category> {
    return this.ormRepository.save(category);
  }
}
