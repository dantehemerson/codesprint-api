import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/category.entity';
import faker from 'faker';

type Optional<T> = T | undefined;

export class FakeCategoriesRepository implements ICategoriesRepository {
  async findBySlug(slug: string): Promise<Category | undefined> {
    return null;
  }

  async createIfNotExists(
    categories: Partial<Category>[],
  ): Promise<Category[]> {
    return [null];
  }

  private categories: Category[] = [];

  public async findById(id: string): Promise<Optional<Category>> {
    const findCategory = this.categories.find(category => category.id === id);

    return findCategory;
  }

  public async findByTitle(title: string): Promise<Optional<Category>> {
    const findCategory = this.categories.find(
      category => category.title === title,
    );

    return findCategory;
  }

  public async create(userData: CreateCategoryDto): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: faker.random.uuid(),
      title: userData.title,
      slug: userData.slug,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    if (categoryIndex !== -1) {
      /*
			It is necessary to update the updated_at property of a category that already exists
			*/
      this.categories[categoryIndex] = category;
      this.categories[categoryIndex].updated_at = new Date();
    } else {
      this.categories.push(category);
    }
    return category;
  }
}
