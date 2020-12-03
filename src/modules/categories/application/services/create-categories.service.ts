import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCategoryByTitleService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(titles: string[]): Promise<Array<{ id: string }>> {
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
