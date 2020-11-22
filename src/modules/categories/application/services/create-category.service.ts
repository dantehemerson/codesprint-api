import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/Category';
import { inject, injectable } from 'tsyringe';
import { ConflictError } from '@shared/errors/conflict.error';
import slugify from 'slugify';

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ title, parent_id }: CreateCategoryDto): Promise<Category> {
    title = title.trim();
    const slug = slugify(title, {
      replacement: '-',
      lower: true,
    });

    const checkCategoryExists = await this.categoriesRepository.findBySlug(
      slug,
    );

    if (checkCategoryExists) {
      throw new ConflictError(
        `An category with the same title ${title} already exists.`,
      );
    }
    const category = await this.categoriesRepository.create({
      title,
      slug,
      parent_id,
    });

    return category;
  }
}
