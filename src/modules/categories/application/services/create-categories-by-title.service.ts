import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/category.entity';
import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCategoryByTitleService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(titles: string[]): Promise<Array<Category>> {
    const newCategories: CreateCategoryDto[] = titles.map(categoryTitle => ({
      title: categoryTitle,
      slug: slugify(categoryTitle, {
        replacement: '-',
        lower: true,
      }),
    }));

    const inserted = await this.categoriesRepository.createIfNotExists(
      newCategories,
    );

    return inserted;
  }
}
